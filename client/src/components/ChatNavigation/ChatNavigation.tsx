import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '@/api';
import { HamburgerIcon } from '@/assets/icons';
import { ContactItem } from '@/components/ChatNavigation';
import { Stack } from '@/components/ui/Stack';
import { UserContext } from '@/context/user';
import { useGetContactsQuery } from '@/utils/api';

import cls from './ChatNavigation.module.scss';

export const ChatNavigation = () => {
  const { chatId } = useParams();
  const { user } = useContext(UserContext);
  const { data: contacts } = useGetContactsQuery(user.id);
  const queryClient = useQueryClient();

  useEffect(() => {
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
      <Stack direction='row' gap='8'>
        <HamburgerIcon width={40} height={40} />

        <div
          style={{
            width: '100%',
          }}
        >
          <input />
        </div>
      </Stack>

      <div className={cls.scrollContainer}>
        <ul className={cls.contactsList}>
          {contacts?.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              chatId={Number(chatId)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
