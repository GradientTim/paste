import {Group, Mark, Text, ThemeIcon} from '@mantine/core';
import {modals} from '@mantine/modals';
import {IoWarning} from 'react-icons/io5';

import type {EditorTab} from '@components/CodeEditor/CodeEditorTab.tsx';

type ConfirmCloseTabProps = {
    tab: EditorTab;
    onConfirm: () => void;
};

export function openCloseTabConfirmation(props: Readonly<ConfirmCloseTabProps>): void {
    modals.openConfirmModal({
        centered: true,
        title: (
            <Group gap={10}>
                <ThemeIcon variant={"light"} color={"orange"}>
                    <IoWarning />
                </ThemeIcon>
                <Text>Confirm</Text>
            </Group>
        ),
        children: (
            <Text size={"sm"}>
                You are in the process of removing the `
                <Mark color={"red"} c={"white"}>
                    {props.tab.fileName}
                </Mark>
                ` tab. This will permanently remove your changes in this tab
            </Text>
        ),
        confirmProps: {
            color: "red",
        },
        labels: {
            confirm: "Yes, remove it",
            cancel: "Cancel",
        },
        onConfirm: props.onConfirm,
    });
}