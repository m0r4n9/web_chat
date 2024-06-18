import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchContacts } from '@/store/slice/Contacts/services/fetchContacts.ts';

import { Contact, ContactsSchema } from './types';

const initialState: ContactsSchema = {
    isLoading: false,
    contacts: [],
};

export const contactSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            if (state.contacts) state.contacts.push(action.payload);
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
                //     state.error = undefined;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.isLoading = false;
            }),
});

export const { actions: contactActions, reducer: contactReducer } =
    contactSlice;
