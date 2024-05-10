import {Box, CloseButton, Flex, Text, ThemeIcon} from '@mantine/core';

import {type Language, findLanguage } from '@/utils';
import classes from './CodeEditorTab.module.pcss';

export type EditorTab = {
	fileName: string;
	language: string;
	content: string;
};

type CodeEditorTabProps = EditorTab & {
	active: boolean;
	closeButtonVisible: boolean;
	onClick: () => void;
	onClose: () => void;
};

export default function CodeEditorTab(
	props: Readonly<CodeEditorTabProps>,
): JSX.Element {
	const language: Language | undefined = findLanguage(props.language);

	return (
		<Box
			onClick={props.onClick}
			className={classes.codeEditorTab}
			data-active={props.active ? true : undefined}
		>
			<Flex
				gap={10}
				wrap={"nowrap"}
				align={"center"}
				direction={"row"}
				justify={"space-between"}
			>
				<ThemeIcon variant={"light"}>{language?.icon}</ThemeIcon>
				<Text c={props.active ? undefined : "dimmed"}>{props.fileName}</Text>
				{ props.closeButtonVisible && (<CloseButton size={"sm"} onClick={props.onClose} />) }
			</Flex>
		</Box>
	);
}
