import * as React from 'react';

import { MaterialThemeProvider } from '@/context/MaterialTheme';
import { QueryProvider, QueryProviderProps } from '@/context/QueryProvider';
import { UserProvider, UserProviderProps } from '@/context/user';

export interface ProviderProps {
  children: React.ReactNode;
  user?: Omit<UserProviderProps, 'children'>;
  query: Omit<QueryProviderProps, 'children'>;
}

export const Providers = ({ children, user, query }: ProviderProps) => {
  return (
    <UserProvider {...user}>
      <MaterialThemeProvider>
        <QueryProvider {...query}>
          {/*<ReactQueryDevtools initialIsOpen={false} />*/}
          {children}
        </QueryProvider>
      </MaterialThemeProvider>
    </UserProvider>
  );
};
