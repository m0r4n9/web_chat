import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { $api } from '@/api';
import { ChatNavigation } from '@/components/ChatNavigation';
import { Stack } from '@/components/ui/Stack';
import { UserContext } from '@/context/user';

import cls from './SidenavLayout.module.scss';

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
  }, [navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cls.main}>
      <Stack
        as='main'
        direction='row'
        gap='12'
        align='stretch'
        className='wrapper'
      >
        <ChatNavigation />
        <Outlet />
      </Stack>
    </div>
  );
};
