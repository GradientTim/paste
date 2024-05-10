import type { Document } from 'mongodb';

type PasteTab = {
    fileName: string;
    language: string;
    content: string;
};

type RawPaste = {
    id: string;
    hidden: boolean;
    tabs: PasteTab[];
    createdAt: Date;
};

type Paste = Document & RawPaste & {
    password: string | undefined | null;
};

export type {
    Paste,
    RawPaste,
    PasteTab,
};