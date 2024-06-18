import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';

import { ThunkConfig } from '@/store';
import { ErrorInterface } from '@/types/Error.ts';

import { User } from '../types.ts';

interface authUserParams {
    email: string;
    password: string;
}

export const authUser = createAsyncThunk<
    User,
    authUserParams,
    ThunkConfig<ErrorInterface>
>('user/AuthUser', async (data, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<User>('/login', {
            data: {
                email: data.email,
                password: data.password,
            },
        });
        return response.data;
    } catch (e) {
        if (isAxiosError(e)) {
            const serverError = e as AxiosError<{
                message?: string;
                errors?: string[];
            }>;
            if (serverError && serverError.response) {
                return rejectWithValue(serverError.response.data);
            }
        }
        return rejectWithValue({
            message: 'Произошла непредвиденная ошибка',
        });
    }
});
