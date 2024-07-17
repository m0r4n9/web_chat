import {
  rem,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

export const SwitchTheme = () => {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = (value: boolean) => {
    setColorScheme(value ? 'light' : 'dark');
  };

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size='md'
      color='dark.4'
      checked={colorScheme === 'light'}
      onChange={(event) => {
        toggleColorScheme(event.currentTarget.checked);
      }}
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};
