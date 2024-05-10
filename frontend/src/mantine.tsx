import {type MantineThemeComponents, Loader, TextInput, MultiSelect, PasswordInput, Select} from "@mantine/core";

export const components: MantineThemeComponents = {
    Loader: Loader.extend({
        defaultProps: {
            type: 'bars',
        },
    }),
    TextInput: TextInput.extend({
        defaultProps: {
            variant: 'filled',
        },
    }),
    PasswordInput: PasswordInput.extend({
        defaultProps: {
            variant: 'filled',
        },
    }),
    Select: Select.extend({
        defaultProps: {
            variant: 'filled',
        },
    }),
    MultiSelect: MultiSelect.extend({
        defaultProps: {
            variant: 'filled',
        },
    }),
};