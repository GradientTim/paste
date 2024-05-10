import {
	ActionIcon,
	Box,
	Button,
	Flex,
	Group,
	ScrollArea,
} from "@mantine/core";
import { useHotkeys, useListState, useLocalStorage } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { Editor, type Monaco } from "@monaco-editor/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import type { Paste, PasteTab } from "@models/paste.ts";
import axios, {
	type AxiosError,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";

import { shikiToMonaco } from "@shikijs/monaco";
import {
	IoAdd,
	IoCheckmark,
	IoClose,
	IoSettings,
	IoTrash,
} from "react-icons/io5";
import { getHighlighter } from "shiki";

import {
	type Language,
	type Theme,
	findLanguage,
	languages,
	themes,
} from "@/utils";

import CodeEditorTab, {
	type EditorTab,
} from "@components/CodeEditor/CodeEditorTab.tsx";

import { notifications } from "@mantine/notifications";
import { openCloseTabConfirmation } from "@modals/ConfirmCloseTabModal.tsx";
import { openSettingsModal } from "@modals/SettingsModal.tsx";

type CodeEditorProps = {
	id: string;
	isNew: boolean;
};

type CreatePasteMutation = {
	hidden: boolean;
	password: string | undefined;
};

export default function CodeEditor(
	props: Readonly<CodeEditorProps>,
): JSX.Element {
	const navigate = useNavigate();
	const [pastePassword, setPastePassword] = useState<string | undefined>(
		undefined,
	);

	const [tabs, tabsHandler] = useListState<EditorTab>([]);

	const infoQuery = useQuery<AxiosResponse>({
		enabled: false,
		retry: false,
		queryKey: ["pastes", "editor", "info"],
		queryFn: async (): Promise<AxiosResponse> => {
			const config: AxiosRequestConfig = {};
			if (pastePassword !== undefined) {
				const headers = config.headers ?? {};
				headers["X-Paste-Password"] = pastePassword;
				config.headers = headers;
			}
			return await axios.get(`/api/pastes/${props.id}`, config);
		},
	});

	const createMutation = useMutation({
		mutationKey: ["pastes", "editor", "create"],
		mutationFn: async (
			mutation: CreatePasteMutation,
		): Promise<AxiosResponse> => {
			const fixedTabs: EditorTab[] = tabs.map(
				(tab: EditorTab): EditorTab => ({
					fileName: tab.fileName,
					language: tab.language,
					content: activeTab === tab ? code : tab.content,
				}),
			);
			return await axios.post("/api/pastes", {
				tabs: fixedTabs,
				...mutation,
			});
		},
	});

	const deleteMutation = useMutation({
		mutationKey: ["pastes", "editor", "delete"],
		mutationFn: async (password: string): Promise<AxiosResponse> => {
			return await axios.delete(`/api/pastes/${props.id}`, {
				headers: {
					"X-Paste-DeleteToken": password,
				},
			});
		},
	});

	const [editorTheme] = useLocalStorage<string>({
		key: "gradient.paste.editor.theme",
		defaultValue: themes[0].id,
		getInitialValueInEffect: true,
	});

	const [language, setLanguage] = useState<Language>(
		tabs.length > 0
			? findLanguage(tabs[0].language) ?? languages[0]
			: languages[0],
	);

	const [activeTab, setActiveTab] = useState<EditorTab | undefined>(undefined);
	const [code, setCode] = useState<string>(activeTab?.content ?? "");

	const handlePasteFetch = (): void => {
		(async (): Promise<void> => {
			const response = await infoQuery.refetch();
			if (response.isSuccess) {
				modals.closeAll();
				const paste: Paste = response.data.data as Paste;
				const pasteTabs: PasteTab[] = paste.tabs;
				tabsHandler.setState(pasteTabs);
				changeTab(pasteTabs[0]);
				return;
			}
			if (response.isError) {
				const error: AxiosError = response.error as AxiosError;
				const status: number = error.request.status ?? 400;
				if (status === 403) {
					if (pastePassword !== undefined) {
						notifications.show({
							title: "Paste",
							message: "The password for this paste is wrong",
							icon: <IoClose />,
							color: "red",
						});
						setPastePassword(undefined);
					}
					modals.openContextModal({
						modal: "paste_password",
						title: "Enter password",
						centered: true,
						closeOnEscape: false,
						closeOnClickOutside: false,
						withCloseButton: false,
						innerProps: {
							onSubmit: (password: string): void => {
								setPastePassword(password);
								setTimeout(handlePasteFetch, 100);
							},
						},
					});
					return;
				}
				await navigate({
					to: "/",
				});
				return;
			}
			await navigate({
				to: "/",
			});
		})();
	};

	const removeTab = (tab: EditorTab): void => {
		const tabIndex: number = tabs.indexOf(tab);
		tabsHandler.remove(tabIndex);
		setTimeout((): void => {
			const rightTab: EditorTab | undefined = tabs[tabIndex + 1];
			if (rightTab !== undefined) {
				changeTab(rightTab);
				return;
			}
			const leftTab: EditorTab | undefined = tabs[tabIndex - 1];
			if (leftTab !== undefined) {
				changeTab(leftTab);
				return;
			}
			if (tabs.length > 0) {
				changeTab(tabs[0]);
			}
		}, 100);
	};

	const interact = (type: "click" | "close", tab: EditorTab): void => {
		if (type === "close") {
			if (activeTab === tab ? code.length > 0 : tab.content.length > 0) {
				openCloseTabConfirmation({
					tab: tab,
					onConfirm: (): void => removeTab(tab),
				});
				return;
			}
			removeTab(tab);
			return;
		}
		changeTab(tab);
	};

	const changeTab = (tab: EditorTab): void => {
		if (activeTab) {
			activeTab.content = code;
		}
		setActiveTab(tab);
		setCode(tab.content);
		setLanguage(findLanguage(tab.language) ?? languages[0]);
	};

	const openCreateTab = (): void =>
		modals.openContextModal({
			modal: "create_tab",
			title: "Create tab",
			centered: true,
			innerProps: {
				onCreate: (name: string, language: string): void => {
					const newTab: EditorTab = {
						fileName: name,
						language: language,
						content: "",
					};
					tabsHandler.append(newTab);
					changeTab(newTab);
				},
			},
		});

	const deletePaste = (): void =>
		modals.openContextModal({
			modal: "delete_paste",
			title: "Delete paste",
			centered: true,
			innerProps: {
				id: props.id,
				onSubmit: async (password: string): Promise<boolean> => {
					const notificationId: string = notifications.show({
						title: "Delete paste",
						message: "Deleting paste...",
						loading: true,
					});
					try {
						const response: AxiosResponse =
							await deleteMutation.mutateAsync(password);
						if (response.status === 204) {
							notifications.update({
								id: notificationId,
								message: "Paste has been successfully deleted",
								loading: false,
								icon: <IoCheckmark />,
							});
							await navigate({ to: "/" });
							return true;
						}
						console.log("blub");
						notifications.update({
							id: notificationId,
							message: "Failed to delete paste",
							icon: <IoClose />,
							loading: false,
							color: "red",
						});
						return false;
					} catch (error) {
						const axiosError: AxiosError = error as AxiosError;
						const errorStatus: number = axiosError.request.status;
						if (errorStatus === 405) {
							notifications.update({
								id: notificationId,
								message: "The admin password is incorrect",
								icon: <IoClose />,
								loading: false,
								color: "red",
							});
							return false;
						}
						notifications.update({
							id: notificationId,
							message: "Failed to delete paste",
							icon: <IoClose />,
							loading: false,
							color: "red",
						});
						return false;
					}
				},
			},
		});

	const createPaste = (): void =>
		modals.openContextModal({
			modal: "create_paste",
			title: "Create paste",
			centered: true,
			innerProps: {
				onCreate: async (
					hidden: boolean,
					password: string | undefined,
					onComplete: () => void,
				): Promise<void> => {
					const notificationId: string = notifications.show({
						title: "Create paste",
						message: "Creating paste...",
						loading: true,
					});
					const response: AxiosResponse = await createMutation.mutateAsync({
						hidden: hidden,
						password: password,
					});
					if (response.status === 200) {
						notifications.update({
							id: notificationId,
							message: "Paste has been successfully created",
							loading: false,
							icon: <IoCheckmark />,
						});
						await navigate({
							to: "/pastes/$id",
							params: {
								id: response.data.pasteId,
							},
						});
					} else {
						notifications.update({
							id: notificationId,
							message: "Failed to create paste",
							icon: <IoClose />,
							loading: false,
							color: "red",
						});
					}
					onComplete();
				},
			},
		});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useMemo((): void => {
		if (!props.isNew) {
			handlePasteFetch();
		} else {
			const tab: EditorTab = {
				fileName: "unnamed",
				language: "none",
				content: "",
			};
			tabsHandler.setState([tab]);
			changeTab(tab);
		}
	}, [props.id]);

	useHotkeys([
		[
			"ArrowRight",
			(): void => {
				const currentIndex: number =
					activeTab === undefined ? 0 : tabs.indexOf(activeTab);
				const nextIndex: number = (currentIndex + 1) % tabs.length;
				changeTab(tabs[nextIndex]);
			},
		],
		[
			"ArrowLeft",
			(): void => {
				const currentIndex: number =
					activeTab === undefined ? 0 : tabs.indexOf(activeTab);
				const previousIndex: number =
					(currentIndex - 1 + tabs.length) % tabs.length;
				changeTab(tabs[previousIndex]);
			},
		],
	]);

	const handleMonacoMount = async (
		_: unknown,
		monaco: Monaco,
	): Promise<void> => {
		const shikiLanguages: Language[] = languages.filter(
			(language: Language): boolean => language.key !== "none",
		);

		const highlighter = await getHighlighter({
			themes: themes.map((theme: Theme) => theme.id),
			langs: shikiLanguages.map((language: Language) => language.key),
		});

		for (const lang of shikiLanguages) {
			monaco.languages.register({ id: lang.key });
		}
		shikiToMonaco(highlighter, monaco);
	};

	const isTabsValid: boolean =
		tabs.length > 0 &&
		tabs.every(
			(tab: EditorTab): boolean =>
				tab.fileName.length > 0 &&
				(activeTab === tab ? code.length > 0 : tab.content.length > 0),
		);

	return (
		<>
			<ScrollArea
				type={"auto"}
				scrollbars={"x"}
				scrollbarSize={10}
				offsetScrollbars={"x"}
			>
				<Group gap={5}>


					<Flex
						gap={5}
						mih={50}
						wrap={"nowrap"}
						align={"center"}
						direction={"row"}
						justify={"flex-start"}
					>
						<ActionIcon
							variant={"light"}
							size={"input-sm"}
							onClick={openSettingsModal}
						>
							<IoSettings />
						</ActionIcon>
						{!props.isNew && (
							<Button
								rightSection={<IoTrash size={17} />}
								color={"red"}
								onClick={deletePaste}
							>
								Delete
							</Button>
						)}
						{props.isNew && (
							<Button
								rightSection={<IoAdd size={17} />}
								onClick={createPaste}
								disabled={!isTabsValid}
							>
								Create
							</Button>
						)}

						{tabs.map((tab: EditorTab, index: number) => (
							<Flex
								gap={5}
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								wrap={"nowrap"}
								direction={"row"}
								align={"center"}
								justify={"flex-start"}
							>
								<CodeEditorTab
									key={tab.fileName}
									active={activeTab === tab}
									closeButtonVisible={props.isNew && tabs.length > 1}
									onClick={() => interact("click", tab)}
									onClose={() => interact("close", tab)}
									{...tab}
								/>
								{index === tabs.length - 1 && props.isNew && (
									<ActionIcon variant={"default"} onClick={openCreateTab}>
										<IoAdd />
									</ActionIcon>
								)}
							</Flex>
						))}
					</Flex>
				</Group>
			</ScrollArea>

			{activeTab && (
				<Box h={"calc(100vh - 9rem)"}>
					<Editor
						value={code}
						theme={editorTheme}
						language={language.key}
						onChange={(value: string | undefined): void => setCode(value ?? "")}
						onMount={handleMonacoMount}
						options={{
							readOnly: !props.isNew,
							domReadOnly: !props.isNew,
							contextmenu: false,
							smoothScrolling: true,
							minimap: {
								enabled: false,
							},
						}}
					/>
				</Box>
			)}
		</>
	);
}
