import { createSlice } from '@reduxjs/toolkit';

import { authUser } from './services/authUser.ts';
import { checkAuth } from './services/checkAuth.ts';
import { registerUser } from './services/registerUser.ts';
import { UserSchema } from './types';

const initialState: UserSchema = {
    isLoading: false,
    user: undefined,
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                if (!localStorage.getItem('user')) {
                    localStorage.setItem('user', state.user.id);
                }
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                if (!localStorage.getItem('user')) {
                    localStorage.setItem('user', state.user.id);
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
            }),
});

export const { actions: userActions, reducer: userReducer } = userSlice;
