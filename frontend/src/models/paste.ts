type PasteTab = {
    fileName: string;
    language: string;
    content: string;
};

type Paste = {
    id: string;
    hidden: boolean;
    tabs: PasteTab[];
    createdAt: Date;
};

export type {
    Paste,
    PasteTab,
};
