import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { QueryProvider, QueryProviderProps } from '@/context/QueryProvider';
import { UserProvider, UserProviderProps } from '@/context/user';

import { MaterialThemeProvider } from './providers/MaterialThemeProvider';

export interface ProviderProps {
    children: ReactNode;
    user?: Omit<UserProviderProps, 'children'>;
    query: Omit<QueryProviderProps, 'children'>;
}

export const Providers = ({ children, user, query }: ProviderProps) => {
    return (
        <UserProvider {...user}>
            <MaterialThemeProvider>
                <QueryProvider {...query}>
                    <ReactQueryDevtools initialIsOpen={true} />
                    {children}
                </QueryProvider>
            </MaterialThemeProvider>
        </UserProvider>
    );
};
