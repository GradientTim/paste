import { Button, LoadingOverlay, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import type { ContextModalProps } from "@mantine/modals";
import { IoKey, IoTrash } from "react-icons/io5";

type DeletePasteProps = {
	id: string;
	onSubmit: (password: string) => Promise<boolean>;
};

type DeletePasteForm = {
	password: string;
};

export const DeletePasteModal = ({
	innerProps,
	context,
	id,
}: ContextModalProps<DeletePasteProps>): JSX.Element => {
	const [visible, { close, open }] = useDisclosure(false);
	const form = useForm<DeletePasteForm>({
		initialValues: {
			password: "",
		},
		validate: {
			password: (value: string): string|null => value.trim().length > 0 ? null : 'Password is required',
		},
	});

	const submit = async (): Promise<void> => {
		open();
		const isSuccess: boolean = await innerProps.onSubmit(form.values.password);
		if (isSuccess) {
			context.closeModal(id);
		}
		close();
	};

	return (
		<Stack gap={"xs"}>
			<LoadingOverlay
				visible={visible}
				zIndex={1000}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>
			<PasswordInput
				label={"Password"}
				leftSection={<IoKey />}
				description={"Enter the admin password"}
				{...form.getInputProps("password")}
			/>
			<Button
				fullWidth
				color={"red"}
				onClick={submit}
				rightSection={<IoTrash size={18} />}
				disabled={!form.isValid()}
			>
				Delete paste
			</Button>
		</Stack>
	);
};
