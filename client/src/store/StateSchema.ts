import { AxiosInstance } from 'axios';
import { usersApi } from './api/userApi';
import { UserSchema } from './slice/User/types';
import { chatApi } from './api/chatApi';
import { ContactsSchema } from '@/store/slice/Contacts/types.ts';

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
