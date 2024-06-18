import { Stack } from '@mui/material';

import { LoginForm } from '@/components/LoginForm';

export const LoginPage = () => {
    return (
        <Stack
            justifyContent='center'
            alignItems='center'
            style={{ height: '50vh' }}
        >
            <LoginForm />
        </Stack>
    );
};
