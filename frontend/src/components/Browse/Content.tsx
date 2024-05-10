import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	Group,
	Loader,
	Pagination,
	ScrollArea,
	Select,
	Stack,
	Text,
	TextInput,
	ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import {
	type ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { IoCheckmark, IoFilter, IoLanguage, IoText } from "react-icons/io5";

import { type Language, findLanguage, languages } from "@/utils";
import PasteComponent from "@components/Browse/Paste.tsx";
import type { Paste } from "@models/paste.ts";
import { useNavigate } from "@tanstack/react-router";
import axios, { type AxiosResponse } from "axios";
import classes from "./Content.module.pcss";

type FilterForm = {
	name: string;
	language: string|undefined;
	page: number;
};

type PastesResponse = {
	meta: {
		hasNext: boolean;
		hasPrevious: boolean;
		limit: number;
		page: number;
		total: number;
		current: number;
	};
	pastes: Paste[];
};

type ContentRef = {
	reload: () => Promise<void>;
};

const Content = forwardRef(function Content(
	props: Readonly<
		FilterForm & {
			changePage: (page: number) => void;
		}
	>,
	ref: ForwardedRef<ContentRef>,
): JSX.Element {
	const navigate = useNavigate();

	const {
		data,
		isLoading,
		refetch,
		isSuccess,
		error,
	}: UseQueryResult<PastesResponse> = useQuery({
		queryKey: ["pastes", "browse", "content"],
		queryFn: async (): Promise<void> => {
			const params: URLSearchParams = new URLSearchParams();
			params.append("page", props.page.toString());
			if (props.language && props.language.trim().length > 0) {
				params.append("language", props.language);
			}
			if (props.name.trim().length > 0) {
				params.append("search", props.name);
			}
			const response: AxiosResponse = await axios.get(`/api/pastes?${params}`);
			return response.data;
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useMemo((): void => {
		setTimeout(async () => await refetch(), 10);
	}, [props.page]);

	useImperativeHandle(
		ref,
		(): ContentRef => ({
			async reload(): Promise<void> {
				await refetch();
			},
		}),
	);

	const openPaste = async (paste: Paste): Promise<void> =>
		await navigate({
			to: "/pastes/$id",
			params: {
				id: paste.id,
			},
		});

	if (isLoading) {
		return (
			<Center w={"100%"}>
				<Loader />
			</Center>
		);
	}
	if (!isSuccess) {
		if (error) {
			return (
				<Stack gap={5}>
					<Text ta={"center"}>{error.name}</Text>
					<Text c={"red"} ta={"center"}>
						{error.message}
					</Text>
				</Stack>
			);
		}
		return (
			<Text c={"red"} ta={"center"}>
				Try to reload the page
			</Text>
		);
	}
	if (data?.pastes.length === 0) {
		return (
			<Text c={"red"} ta={"center"}>
				No pastes were found
			</Text>
		);
	}
	return (
		<Box mt={10}>
			<Flex justify={"end"}>
				<Pagination
					boundaries={1}
					value={props.page}
					total={data?.meta.total}
					onChange={props.changePage}
				/>
			</Flex>

			<Box mt={"xs"}>
				<ScrollArea h={"calc(100vh - 15rem)"} scrollbars={"y"} offsetScrollbars={"y"}>
					{data?.pastes.map((paste: Paste) => (
						<PasteComponent
							key={paste.id}
							click={() => openPaste(paste)}
							{...paste}
						/>
					))}
				</ScrollArea>
			</Box>
		</Box>
	);
});

export default function BrowseContent(): JSX.Element {
	const contentRef = useRef<ContentRef>(null);

	const filterForm = useForm<FilterForm>({
		initialValues: {
			name: "",
			language: "",
			page: 1,
		},
	});

	const filter = async (): Promise<void> => {
		await contentRef.current?.reload();
	};

	return (
		<Box className={classes.browseContent}>
			<Box className={classes.browseFilter}>
				<Grid grow align={"end"} gutter={"xs"}>
					<Grid.Col span={{ base: 6 }}>
						<TextInput
							label={"Name"}
							leftSection={<IoText />}
							{...filterForm.getInputProps("name")}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 6, md: 4 }}>
						<Select
							clearable
							searchable
							label={"Language"}
							leftSection={<IoLanguage />}
							renderOption={({ option, checked }) => {
								const language: Language =
									findLanguage(option.value) ?? languages[0];
								return (
									<Group flex={1} gap={"xs"}>
										<ThemeIcon variant={"light"}>{language.icon}</ThemeIcon>
										<Text>{option.label}</Text>
										{checked && (
											<IoCheckmark style={{ marginInlineStart: "auto" }} />
										)}
									</Group>
								);
							}}
							data={languages.map((language: Language) => ({
								label: language.name,
								value: language.key,
							}))}
							{...filterForm.getInputProps("language")}
						/>
					</Grid.Col>
					<Grid.Col span={2}>
						<Button
							fullWidth
							rightSection={<IoFilter size={18} />}
							onClick={filter}
						>
							Filter
						</Button>
					</Grid.Col>
				</Grid>
			</Box>

			<Box mt={5}>
				<Content
					ref={contentRef}
					changePage={(page: number) => filterForm.setFieldValue("page", page)}
					{...filterForm.values}
				/>
			</Box>
		</Box>
	);
}
