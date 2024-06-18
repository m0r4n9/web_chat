import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';

import { ThunkConfig } from '@/store';
import { ErrorInterface } from '@/types/Error.ts';

import { User } from '../types.ts';

interface registerUserParams {
    email: string;
    password: string;
    username?: string;
}

export const registerUser = createAsyncThunk<
    User,
    registerUserParams,
    ThunkConfig<ErrorInterface>
>('user/registerUser', async (data, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<User>('/register', {
            data,
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
