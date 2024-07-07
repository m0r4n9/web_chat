import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { $api } from '@/api';

interface CreateChat {
  chatId: number;
}

interface CreateChatParams {
  userId: number;
  currentUserId: number;
}

export const usePostCreateChatMutation = () =>
  useMutation<CreateChat, AxiosError, CreateChatParams>({
    mutationKey: ['createChat'],
    mutationFn: async (data) => {
      const response = await $api.post('/chat', data);
      return response.data;
    },
  });
