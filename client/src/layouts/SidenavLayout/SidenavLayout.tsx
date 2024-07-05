import { Button, Divider, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { $api } from '@/api';
import { ChatNavigation } from '@/components/ChatNavigation';
import { UserContext } from '@/context/user';

// TODO: redesign check auth when start app.
export const SidenavLayout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const check = async () => {
            if (localStorage.getItem('token')) {
                const response = await $api.get<User>('/refresh');
                const userData = response.data;

                if (userData.accessToken) {
                    localStorage.setItem('token', userData.accessToken);
                    setUser(userData);
                } else {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
            setIsLoading(false);
        };
        check();
    }, []);

    const onLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    if (isLoading) {
        return <div>Loading...</div>;
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
