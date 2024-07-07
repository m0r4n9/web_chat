import { useQuery } from '@tanstack/react-query';

import { $api } from '@/api';

type Members = {
  userId: number;
}[];

export const useGetChatMembers = (chatId: string) =>
  useQuery<Members>({
    queryKey: ['chatMembers'],
    queryFn: async () => {
      const response = await $api.get<Members>(`/chat/members/${chatId}`);
      return response.data;
    },
  });
