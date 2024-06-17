import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../StateSchema';
import { User } from '../types';
import { AxiosError, isAxiosError } from 'axios';

export const checkAuth = createAsyncThunk<
    User,
    string,
    ThunkConfig<{
        message?: string;
        errors?: string[];
    }>
>('user/checkAuth', async (userId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        // Так делать очевидно нельзя. Тут должна быть проверка, например, по токену.
        const response = await extra.api.get<User>(`/user/refresh/${userId}`);
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
