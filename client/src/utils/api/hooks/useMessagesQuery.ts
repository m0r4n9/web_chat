import { useInfiniteQuery } from '@tanstack/react-query';

import { $api } from '@/api';

interface Message {
    senderId: number;
    content: string;
    chatId: number;
    username?: string;
}

interface ApiResponse {
    data: Message[];
    nextCursor?: string;
    isLastPage: boolean;
}

const fetchMessages = async ({
    pageParam,
    chatId,
}: {
    pageParam: unknown;
    chatId: number;
}) => {
    const response = await $api.get(`/messages/${chatId}?page=${pageParam}`);
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    })
    return response.data;
};

export const useMessagesQuery = (chatId: number) => {
    return useInfiniteQuery<ApiResponse, { error: string }>({
        queryKey: ['messages', chatId],
        queryFn: ({ pageParam = 1 }) => fetchMessages({ pageParam, chatId }),
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.isLastPage ? undefined : lastPage.nextCursor,
    });
};
