export interface Contact {
    id: string;
    username: string;
    chatId: number;
}

export interface ContactsSchema {
    isLoading: boolean;
    contacts?: Contact[];
}
