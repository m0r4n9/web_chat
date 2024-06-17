import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/store';
import { User } from '../types.ts';
import { AxiosError, isAxiosError } from 'axios';

interface authUserParams {
    email: string;
    password: string;
}

export const authUser = createAsyncThunk<
    User,
    authUserParams,
    ThunkConfig<{
        message?: string;
        errors?: string[];
    }>
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
