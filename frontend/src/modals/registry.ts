import {CreatePasteModal} from '@modals/CreatePasteModal.tsx';
import {CreateTabModal} from '@modals/CreateTabModal.tsx';
import {DeletePasteModal} from '@modals/DeletePasteModal.tsx';
import {PastePasswordModal} from '@modals/PastePasswordModal.tsx';
import {SettingsModal} from '@modals/SettingsModal.tsx';

export const mantineModals = {
    settings: SettingsModal,
    create_tab: CreateTabModal,
    create_paste: CreatePasteModal,
    delete_paste: DeletePasteModal,
    paste_password: PastePasswordModal,
};

declare module '@mantine/modals' {
    export interface MantineModalsOverride {
        modals: typeof mantineModals;
    }
}