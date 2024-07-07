import { useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { socket } from '@/api';
import { ContactItem } from '@/components/ChatNavigation';
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
      <Link to='/' className={cls.homeLink}>
        Чаты
      </Link>

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
