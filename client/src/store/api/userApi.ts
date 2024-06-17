import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'users',
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (userId?: string) => `/users/${userId}`,
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
