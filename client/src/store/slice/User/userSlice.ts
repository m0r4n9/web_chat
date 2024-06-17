import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from './types';
import { authUser } from './services/authUser.ts';
import { checkAuth } from './services/checkAuth.ts';

const initialState: UserSchema = {
    isLoading: false,
    user: undefined,
    _inited: false,
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
                console.log(state.user);
                if (!localStorage.getItem('user')) {
                    localStorage.setItem('user', state.user.id);
                }
            })
            .addCase(authUser.rejected, (state) => {
                state.isLoading = false;
                state.user = undefined;
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
                state.user = undefined;
            }),
});

export const { actions: userActions, reducer: userReducer } = userSlice;
