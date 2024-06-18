import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { $api } from '@/api/api.ts';
import { contactReducer } from '@/store/slice/Contacts/contactsSlice.ts';

import { chatApi } from './api/chatApi.ts';
import { usersApi } from './api/userApi.ts';
import { userReducer } from './slice/User/userSlice.ts';
import { StateSchema, ThunkExtraArg } from './StateSchema.ts';

export function createReduxStore() {
    const rootReducer: ReducersMapObject<StateSchema> = {
        user: userReducer,
        contacts: contactReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
    };

    const extraArgs: ThunkExtraArg = {
        api: $api,
    };

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArgs,
                },
            }).concat(usersApi.middleware, chatApi.middleware),
    });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
