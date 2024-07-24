import 'moment/locale/ru';

import * as React from 'react';

import { QueryProvider, QueryProviderProps } from '@/context/QueryProvider';
import { UserProvider, UserProviderProps } from '@/context/user';

import {
  MantineThemeProvider,
  MantineThemeProviderProps,
} from './context/MantineThemeProvider';

export interface ProviderProps {
  children: React.ReactNode;
  user?: Omit<UserProviderProps, 'children'>;
  query: Omit<QueryProviderProps, 'children'>;
  mantine?: Omit<MantineThemeProviderProps, 'children'>;
}

export const Providers = ({
  children,
  user,
  query,
  mantine,
}: ProviderProps) => {
  return (
    <UserProvider {...user}>
      <QueryProvider {...query}>
        <MantineThemeProvider {...mantine}>
          {/*<ReactQueryDevtools initialIsOpen={false} />*/}
          {children}
        </MantineThemeProvider>
      </QueryProvider>
    </UserProvider>
  );
};
