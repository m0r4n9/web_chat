import { Button, Divider, Stack } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ChatNavigation } from '@/components/ChatNavigation';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { checkAuth } from '@/store/slice/User/services/checkAuth.ts';

export const SidenavLayout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userId = localStorage.getItem('user');

        if (userId) {
            dispatch(checkAuth(userId));
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className='main'>
            <h1>Online-web Chat</h1>
            <Button onClick={onLogout}>Выйти из аккаунта</Button>
            <Stack
                direction='row'
                spacing={2}
                alignItems='stretch'
                className='wrapper'
                style={{ marginTop: 20 }}
                divider={<Divider orientation='vertical' flexItem />}
            >
                <ChatNavigation />
                <Outlet />
            </Stack>
        </div>
    );
};
