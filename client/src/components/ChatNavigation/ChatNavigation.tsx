import { Box, Flex, TextInput } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '@/api';
import { SearchIcon } from '@/assets/icons';
import { ContactItem } from '@/components/ChatNavigation';
import { SettingsMenu } from '@/components/SettingsMenu';
import { useUser } from '@/context/user';
import { useGetContactsQuery } from '@/utils/api';

import cls from './ChatNavigation.module.scss';

export const ChatNavigation = () => {
  const { chatId } = useParams();
  const { user } = useUser();

  const { data: contacts } = useGetContactsQuery(user.id);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const handleMessage = (message: Message) => {
      queryClient.setQueryData(['contacts'], (oldData: Contact[]) => {
        if (!oldData) return;
        return oldData.map((contact) => {
          if (contact.chatId === message.chatId) {
            return { ...contact, message: message.content };
          }
          return contact;
        });
      });
    };

    socket.on('message:sent', handleMessage);

    return () => {
      socket.off('message:sent', handleMessage);
      if (socket && socket.connected) socket.disconnect();
    };
  }, [queryClient]);

  return (
    <Box bg='backgroundColor' className={cls.ChatNavigation}>
      <Flex direction='row' align='center' className={cls.NavigationHeader}>
        {/*<Burger opened={false} aria-label='Toggle settings' />*/}
        <SettingsMenu />

        <TextInput
          variant='filled'
          size='sm'
          radius='lg'
          placeholder='Поиск...'
          leftSection={<SearchIcon />}
          className={cls.SearchInput}
        />
      </Flex>

      <div className={cls.scrollContainer}>
        <Flex
          component='ul'
          direction='column'
          gap='sm'
          className={cls.contactsList}
        >
          {contacts?.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              chatId={Number(chatId)}
            />
          ))}
        </Flex>
      </div>
    </Box>
  );
};
