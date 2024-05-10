import {
	Center,
	Grid,
	Group,
	type MantineColorScheme,
	SegmentedControl,
	Select,
	Stack,
	Text,
	ThemeIcon,
	rem,
	useMantineColorScheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
	PiAppWindow,
	PiCodeBlock,
	PiMoon,
	PiRobot,
	PiSun,
} from "react-icons/pi";

import { type Theme, findTheme, themes } from "@/utils";
import { useLocalStorage } from "@mantine/hooks";

export const SettingsModal = (): JSX.Element => {
	const { colorScheme, setColorScheme } = useMantineColorScheme();

	const [editorTheme, setEditorTheme] = useLocalStorage<string>({
		key: "gradient.paste.editor.theme",
		defaultValue: themes[0].id,
		getInitialValueInEffect: true,
	});

	const changeTheme = (value: string | null): void => {
		const theme: Theme = value ? findTheme(value) ?? themes[0] : themes[0];
		if (editorTheme !== theme.id) {
			setEditorTheme(theme.id);
		}
	};

	return (
		<Stack gap={5}>
			<Grid>
				<Grid.Col span={6}>
					<Group gap={10}>
						<ThemeIcon variant={"light"} size={"lg"}>
							<PiAppWindow />
						</ThemeIcon>
						<Text>Scheme</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={6}>
					<SegmentedControl
						fullWidth
						value={colorScheme}
						onChange={(value: string) =>
							setColorScheme(value as MantineColorScheme)
						}
						data={[
							{
								label: (
									<Center style={{ gap: 10 }}>
										<PiRobot style={{ width: rem(16), height: rem(16) }} />
										<Text>Auto</Text>
									</Center>
								),
								value: "auto",
							},
							{
								label: (
									<Center style={{ gap: 10 }}>
										<PiMoon style={{ width: rem(16), height: rem(16) }} />
										<Text>Dark</Text>
									</Center>
								),
								value: "dark",
							},
							{
								label: (
									<Center style={{ gap: 10 }}>
										<PiSun style={{ width: rem(16), height: rem(16) }} />
										<Text>Light</Text>
									</Center>
								),
								value: "light",
							},
						]}
					/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={6}>
					<Group gap={10}>
						<ThemeIcon variant={"light"} size={"lg"}>
							<PiCodeBlock />
						</ThemeIcon>
						<Text>Editor theme</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={6}>
					<Select
						value={editorTheme}
						allowDeselect={false}
						onChange={changeTheme}
						data={themes.map((theme: Theme) => ({
							label: theme.name,
							value: theme.id,
						}))}
					/>
				</Grid.Col>
			</Grid>
		</Stack>
	);
};

export function openSettingsModal(): void {
	modals.openContextModal({
		modal: "settings",
		title: "Settings",
		centered: true,
		size: "lg",
		innerProps: {},
	});
}
