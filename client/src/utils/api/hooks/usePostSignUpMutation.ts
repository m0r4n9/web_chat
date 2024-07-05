import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { $api } from '@/api';

interface UseAuthQueryParams {
    email: string;
    password: string;
}

const saveUser = (user: { id: string; username: string; email: string }) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const signUp = async (data: UseAuthQueryParams) => {
    const response = await $api.post('/register', data);
    return response.data;
};

export const usePostSignUpMutation = () => {
    const navigate = useNavigate();

    return useMutation<
        {
            id: string;
            username: string;
            email: string;
        },
        AxiosError<{
            message: string;
        }>,
        UseAuthQueryParams
    >({
        mutationKey: ['signUp'],
        mutationFn: (data) => signUp(data),
        onSuccess: (data) => {
            console.log('User after sign up: ', data);
            saveUser(data);
            navigate('/');
        },
    });
};
