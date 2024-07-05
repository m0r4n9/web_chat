import { useInfiniteQuery } from '@tanstack/react-query';

import { $api } from '@/api';

const fetchMessages = async ({
    pageParam,
    chatId,
}: {
    pageParam: unknown;
    chatId: number;
}) => {
    const response = await $api.get(`/messages/${chatId}?page=${pageParam}`);
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    return response.data;
};

export const useMessagesQuery = (chatId: number) => {
    return useInfiniteQuery<MessagesChatApiResponse, { error: string }>({
        queryKey: ['chat', `${chatId}`],
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
