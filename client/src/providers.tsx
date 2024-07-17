import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import * as React from 'react';

import { QueryProvider, QueryProviderProps } from '@/context/QueryProvider';
import { UserProvider, UserProviderProps } from '@/context/user';

export interface ProviderProps {
  children: React.ReactNode;
  user?: Omit<UserProviderProps, 'children'>;
  query: Omit<QueryProviderProps, 'children'>;
}

export const Providers = ({ children, user, query }: ProviderProps) => {
  const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
    colors: {
      primary: virtualColor({
        name: 'primary',
        dark: 'dark',
        light: 'cyan',
      }),
      backgroundColor: virtualColor({
        name: 'backgroundColor',
        dark: '#242424',
        light: '#FFF',
      }),
    },
  });

  return (
    <UserProvider {...user}>
      <MantineProvider theme={theme}>
        <QueryProvider {...query}>
          {/*<ReactQueryDevtools initialIsOpen={false} />*/}
          {children}
        </QueryProvider>
      </MantineProvider>
    </UserProvider>
  );
};
