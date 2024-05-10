import {CodeHighlightTabs} from '@mantine/code-highlight';
import {Flex, Text, ThemeIcon} from '@mantine/core';
import {IoDocument} from 'react-icons/io5';

import {type Language, findLanguage, languages} from '@/utils';
import type {Paste, PasteTab} from '@models/paste.ts';
import classes from './Paste.module.pcss';

export default function PasteComponent(props: Readonly<Paste & {
    click: () => void,
}>): JSX.Element {
    return (<div className={classes.pasteWrapper} onClick={props.click}>
        <div className={classes.pasteHeader}>
            <Flex gap={"sm"} align={"center"}>
                <ThemeIcon variant={"light"}>
                    <IoDocument />
                </ThemeIcon>
                <Text c={"dimmed"}>{props.id}</Text>
            </Flex>
        </div>

        <CodeHighlightTabs
            expanded={false}
            withCopyButton={false}
            defaultExpanded={false}
            withExpandButton={false}
            expandCodeLabel={" "}
            code={props.tabs.map((tab: PasteTab) => {
                const language: Language = findLanguage(tab.language) ?? languages[0];
                return {
                    fileName: tab.fileName,
                    code: tab.content,
                    icon: language.icon,
                }
            })}
        />
    </div>);
}