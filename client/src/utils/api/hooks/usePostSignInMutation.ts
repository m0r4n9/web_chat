import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { $api } from '@/api';

interface UseAuthQueryParams {
  email: string;
  password: string;
}

const signIn = async (data: UseAuthQueryParams) => {
  const response = await $api.post('/login', data);
  return response.data;
};

export const usePostSignInMutation = () => {
  return useMutation<
    User,
    AxiosError<{
      message: string;
    }>,
    UseAuthQueryParams
  >({
    mutationKey: ['signIn'],
    mutationFn: (data) => signIn(data),
  });
};
