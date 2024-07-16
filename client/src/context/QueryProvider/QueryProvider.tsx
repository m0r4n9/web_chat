import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

export interface QueryProviderProps
  extends React.ComponentProps<typeof QueryClientProvider> {
  children: React.ReactNode;
}

export const QueryProvider = ({ children, client }: QueryProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
