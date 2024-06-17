import { LoginForm } from '@/components/LoginForm';
import { Stack } from '@mui/material';

export const LoginPage = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            style={{ height: '50vh' }}
        >
            <LoginForm />
        </Stack>
    );
};
