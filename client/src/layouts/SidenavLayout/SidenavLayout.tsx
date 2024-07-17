import { Flex } from '@mantine/core';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { $api } from '@/api';
import { ChatNavigation } from '@/components/ChatNavigation';
import { useUser } from '@/context/user';

import cls from './SidenavLayout.module.scss';

export const SidenavLayout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
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
      <Flex
        component='main'
        direction='row'
        align='stretch'
        className={cls.wrapper}
      >
        <ChatNavigation />
        <Outlet />
      </Flex>
    </div>
  );
};
