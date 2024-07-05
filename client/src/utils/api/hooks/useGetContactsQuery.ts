import { useQuery } from '@tanstack/react-query';

import { $api } from '@/api';

const fetchContacts = async (userId: number) => {
    const response = await $api.get(`/chat/${userId}`);
    return response.data;
};

export const useGetContactsQuery = (userId: number) => {
    return useQuery<
        Contact[],
        {
            message?: string;
            errors?: string[];
        }
    >({
        queryKey: ['contacts'],
        queryFn: () => fetchContacts(userId),
        retry: false,
    });
};
