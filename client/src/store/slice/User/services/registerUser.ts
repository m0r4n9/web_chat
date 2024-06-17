import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/store';
import { User } from '../types.ts';
import { AxiosError, isAxiosError } from 'axios';

interface registerUserParams {
    email: string;
    password: string;
    username?: string;
}

export const registerUser = createAsyncThunk<
    User,
    registerUserParams,
    ThunkConfig<{
        message?: string;
        errors?: string[];
    }>
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
