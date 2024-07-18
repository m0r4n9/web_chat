import { Flex, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { SettingsMenu } from '@/components/SettingsMenu';

import cls from './ChatHeader.module.scss';

export const ChatHeader = () => {
  return (
    <Flex direction='row' align='center' className={cls.NavigationHeader}>
      <SettingsMenu />

      <TextInput
        variant='default'
        size='md'
        radius='xl'
        placeholder='Поиск...'
        leftSection={<IconSearch size={16} />}
        className={cls.SearchInput}
      />
    </Flex>
  );
};
