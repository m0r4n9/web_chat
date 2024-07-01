import { Button, Divider, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { $api } from '@/api';
import { ChatNavigation } from '@/components/ChatNavigation';
import { UserContext } from '@/context/user';

export const SidenavLayout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            const getUserData = async () => {
                const response = await $api.get(`/user/refresh/${userId}`);
                setUser(response.data);
            };

            getUserData();
        }
        setIsLoading(false);

    }, []);

    const onLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

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
