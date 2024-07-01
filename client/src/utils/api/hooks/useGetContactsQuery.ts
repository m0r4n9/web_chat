import { useQuery } from "@tanstack/react-query";

import { $api } from "@/api";

export interface Contact {
    id: string;
    username: string;
    chatId: number;
}

const fetchContacts = async (userId: string) => {
    const response = await $api.get(`/chat/${userId}`);
    return response.data;
}

export const useGetContactsQuery = (userId: string) => {
    return useQuery<Contact[], {
        message?: string;
        errors?: string[];
    }>({
        queryKey: ['contacts'],
        queryFn: () => fetchContacts(userId),
    });
}