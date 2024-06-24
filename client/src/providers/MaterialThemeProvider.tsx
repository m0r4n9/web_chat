import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const MaterialThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
