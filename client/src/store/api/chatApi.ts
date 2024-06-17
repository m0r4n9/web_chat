import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        createChat: builder.mutation({
            query: ({ currentUserId, userId }) => ({
                url: 'chat',
                method: 'POST',
                body: { currentUserId, userId },
            }),
        }),
    }),
});

export const { useCreateChatMutation } = chatApi;
