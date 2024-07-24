import { Box, Flex } from '@mantine/core';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '@/api';
import { ContactItem } from '@/components/ChatNavigation';
import { useUser } from '@/context/user';
import { useGetContactsQuery } from '@/utils/api';

import { ChatHeader } from './ChatHeader/ChatHeader';
import cls from './ChatNavigation.module.scss';

const updateOnlineStatusContacts = ({
  queryClient,
  userId,
  onlineStatus,
}: {
  queryClient: QueryClient;
  userId: number;
  onlineStatus: boolean;
}) => {
  queryClient.setQueryData(['contacts'], (oldData: Contact[]) => {
    if (!oldData) return;

    return oldData.map((contact) => {
      if (contact.id === userId) {
        return { ...contact, isOnline: onlineStatus };
      }
      return contact;
    });
  });
};

export const ChatNavigation = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const { data: contacts } = useGetContactsQuery(user.id);
  const queryClient = useQueryClient();

  // TODO: refactor this. smell no well
  React.useEffect(() => {
    socket.connect();
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

    socket.on('user:connected', (userId: number) => {
      updateOnlineStatusContacts({
        queryClient,
        userId,
        onlineStatus: true,
      });
    });

    socket.on('user:disconnected', (userId: number) => {
      updateOnlineStatusContacts({
        queryClient,
        userId,
        onlineStatus: false,
      });
    });

    socket.on('message:sent', handleMessage);

    return () => {
      socket.off('message:sent', handleMessage);
      socket.off('user:connected', (userId: number) => {
        updateOnlineStatusContacts({
          queryClient,
          userId,
          onlineStatus: true,
        });
      });
      socket.off('user:disconnected', (userId: number) => {
        updateOnlineStatusContacts({
          queryClient,
          userId,
          onlineStatus: false,
        });
      });
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
