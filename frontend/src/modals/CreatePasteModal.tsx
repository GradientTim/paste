import {
	Button,
	Checkbox,
	LoadingOverlay,
	PasswordInput,
	Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import type { ContextModalProps } from "@mantine/modals";
import { IoAdd, IoKey } from "react-icons/io5";

type CreatePasteProps = {
	onCreate: (
		hidden: boolean,
		password: string | undefined,
		onComplete: () => void,
	) => Promise<void>;
};

type CreatePasteForm = {
	password: string;
	hidden: boolean;
};

export const CreatePasteModal = ({
	innerProps,
	context,
	id,
}: ContextModalProps<CreatePasteProps>): JSX.Element => {
	const [visible, { close, open }] = useDisclosure(false);
	const form = useForm<CreatePasteForm>({
		initialValues: {
			password: "",
			hidden: false,
		},
	});

	const submit = async (): Promise<void> => {
		const { password, hidden } = form.values;
		open();
		await innerProps.onCreate(
			hidden,
			password.trim().length > 0 ? password : undefined,
			(): void => {
				context.closeModal(id);
				close();
			},
		);
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
				description={"Protect this paste with a password (optional)"}
				{...form.getInputProps("password")}
			/>
			<Checkbox
				label={
					"Mark this paste as hidden to ensure that it cannot be found via the paste browser"
				}
				{...form.getInputProps("hidden")}
			/>
			<Button fullWidth onClick={submit} rightSection={<IoAdd size={18} />}>
				Create paste
			</Button>
		</Stack>
	);
};
