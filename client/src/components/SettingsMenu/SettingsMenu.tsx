import { Burger, Menu, rem } from '@mantine/core';
import { IconLogout, IconPalette } from '@tabler/icons-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { SwitchTheme } from '@/components/SwitchTheme';

export const SettingsMenu = () => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = React.useState(false);

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', {
      replace: true,
    });
  };

  return (
    <Menu shadow='lg' width={200} onChange={(opened) => setIsOpened(opened)}>
      <Menu.Target>
        <Burger opened={isOpened} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          closeMenuOnClick={false}
          leftSection={
            <IconPalette style={{ width: rem(14), height: rem(14) }} />
          }
          rightSection={<SwitchTheme />}
        >
          Тема
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={onLogout}
          color='red'
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
