import { useQuery } from '@tanstack/react-query';

import { $api } from '@/api';

interface UseGetDataChatResponse {
  access: boolean;
  interlocutor?: Interlocutor;
}

export const useGetDataChat = (chatId: string) =>
  useQuery<UseGetDataChatResponse>({
    queryKey: ['chatMembers', chatId],
    queryFn: async () => {
      const response = await $api.get<UseGetDataChatResponse>(
        `/chat/${chatId}/check-access`,
      );
      return response.data;
    },
  });
