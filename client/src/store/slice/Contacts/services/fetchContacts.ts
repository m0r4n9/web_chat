import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, isAxiosError } from 'axios';

import { ThunkConfig } from '../../../StateSchema';
import { Contact } from '../types';

export const fetchContacts = createAsyncThunk<
    Contact[],
    string,
    ThunkConfig<{
        message?: string;
        errors?: string[];
    }>
>('contact', async (userId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<Contact[]>(`/chat/${userId}`);
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
