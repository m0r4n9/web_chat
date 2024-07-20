import { Box, Flex } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '@/api';
import { ContactItem } from '@/components/ChatNavigation';
import { useUser } from '@/context/user';
import { useGetContactsQuery } from '@/utils/api';

import { ChatHeader } from './ChatHeader/ChatHeader';
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
    <Box className={cls.ChatNavigation}>
      <ChatHeader />
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
