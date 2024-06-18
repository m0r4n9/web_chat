import { AxiosInstance } from 'axios';

import { ContactsSchema } from '@/store/slice/Contacts/types.ts';

import { chatApi } from './api/chatApi';
import { usersApi } from './api/userApi';
import { UserSchema } from './slice/User/types';

export interface StateSchema {
    user: UserSchema;
    contacts: ContactsSchema;
    [usersApi.reducerPath]: ReturnType<typeof usersApi.reducer>;
    [chatApi.reducerPath]: ReturnType<typeof chatApi.reducer>;
}

export type StateSchemaKey = keyof StateSchema;

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
