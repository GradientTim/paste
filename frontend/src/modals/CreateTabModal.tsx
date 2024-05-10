import {
	Button,
	Group,
	Select,
	Stack,
	Text,
	TextInput,
	ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ContextModalProps } from "@mantine/modals";
import { IoAdd, IoCheckmark, IoLanguage, IoText } from "react-icons/io5";

import { type Language, findLanguage, languages } from "@/utils";

type CreateTabProps = {
	onCreate: (name: string, language: string) => void;
};

type CreateTabForm = {
	name: string;
	language: string;
};

export const CreateTabModal = ({
	innerProps,
	context,
	id,
}: ContextModalProps<CreateTabProps>): JSX.Element => {
	const form = useForm<CreateTabForm>({
		initialValues: {
			name: "",
			language: "none",
		},
		validate: {
			name: (value: string): string | null =>
				value.length > 0
					? value.length > 15
						? "Max 15 characters allowed"
						: null
					: "Name is required",
			language: (value: string): string | null =>
				value.length > 0 ? null : "Language is required",
		},
	});

	const createTab = (): void => {
		const { name, language } = form.values;
		innerProps.onCreate(name, language);
		context.closeModal(id);
	};

	return (
		<Stack gap={5}>
			<TextInput
				required
				autoFocus
				label={"Name"}
				description={"Max. 15 characters"}
				maxLength={15}
				leftSection={<IoText />}
				{...form.getInputProps("name")}
			/>
			<Select
				required
				searchable
				label={"Language"}
				allowDeselect={false}
				leftSection={<IoLanguage />}
				renderOption={({ option, checked }) => {
					const language: Language = findLanguage(option.value) ?? languages[0];
					return (
						<Group flex={1} gap={"xs"}>
							<ThemeIcon variant={"light"}>{language.icon}</ThemeIcon>
							<Text>{option.label}</Text>
							{checked && <IoCheckmark style={{ marginInlineStart: "auto" }} />}
						</Group>
					);
				}}
				data={languages.map((language: Language) => ({
					label: language.name,
					value: language.key,
				}))}
				{...form.getInputProps("language")}
			/>
			<Button
				fullWidth
				onClick={createTab}
				rightSection={<IoAdd size={18} />}
				disabled={!form.isValid()}
			>
				Create new tab
			</Button>
		</Stack>
	);
};
