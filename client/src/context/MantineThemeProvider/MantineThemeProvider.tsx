import { MantineProvider, MantineProviderProps } from '@mantine/core';
import * as React from 'react';

import { theme } from '@/config/MantineTheme';

export interface MantineThemeProviderProps extends MantineProviderProps {
  children: React.ReactNode;
}

export const MantineThemeProvider = ({
  children,
  ...props
}: MantineThemeProviderProps) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme='dark' {...props}>
      {children}
    </MantineProvider>
  );
};
