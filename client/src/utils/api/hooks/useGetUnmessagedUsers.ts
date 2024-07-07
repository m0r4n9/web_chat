import { useQuery } from '@tanstack/react-query';

import { $api } from '@/api';

export const useGetUnmessagedUsers = (userId: number) =>
  useQuery<Omit<User, 'accessToken'>[]>({
    queryKey: ['unMessagedUser'],
    queryFn: async () => {
      const response = await $api.get(`/users/${userId}`);
      return response.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
