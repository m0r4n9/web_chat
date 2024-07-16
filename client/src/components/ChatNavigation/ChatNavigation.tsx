import { useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '@/api';
import { HamburgerIcon, SearchIcon } from '@/assets/icons';
import { ContactItem } from '@/components/ChatNavigation';
import { Flex } from '@/components/ui/Flex';
import { Input } from '@/components/ui/Input';
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
    <div className={cls.ChatNavigation}>
      <Flex
        direction='row'
        align='center'
        gap='8'
        className={cls.NavigationHeader}
      >
        <Flex align='center' justify='center'>
          <HamburgerIcon width='2.5rem' height='2.5rem' />
        </Flex>

        <Flex max className={cls.Search}>
          <SearchIcon className={cls.SearchIcon} />
          <Input placeholder='Поиск...' className={cls.input} />
        </Flex>
      </Flex>

      <div className={cls.scrollContainer}>
        <Flex
          as='ul'
          direction='column'
          gap='8'
          max
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
    </div>
  );
};
