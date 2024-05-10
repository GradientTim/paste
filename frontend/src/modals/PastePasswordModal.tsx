import { Button, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ContextModalProps } from "@mantine/modals";
import { IoArrowForward, IoText } from "react-icons/io5";

type PastePasswordProps = {
	onSubmit: (password: string) => void;
};

type PastePasswordForm = {
	password: string;
};

export const PastePasswordModal = ({
	innerProps,
}: ContextModalProps<PastePasswordProps>): JSX.Element => {
	const form = useForm<PastePasswordForm>({
		initialValues: {
			password: "",
		},
		validate: {
			password: (value: string): string | null =>
				value.length > 0 ? null : "Name is required",
		},
	});

	const submitPassword = (): void => {
		innerProps.onSubmit(form.values.password);
	};

	return (
		<Stack gap={5}>
			<PasswordInput
				required
				autoFocus
				label={"Password"}
				leftSection={<IoText />}
				{...form.getInputProps("password")}
			/>
			<Button
				fullWidth
				onClick={submitPassword}
				rightSection={<IoArrowForward size={18} />}
				disabled={!form.isValid()}
			>
				Submit password
			</Button>
		</Stack>
	);
};
