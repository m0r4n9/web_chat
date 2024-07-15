import { Link } from 'react-router-dom';

import { ColorAvatar } from '@/components/ColorAvatar';
import { Flex } from '@/components/ui/Flex';

import cls from '../ChatNavigation.module.scss';

interface ContactItemProps {
  contact: Contact;
  chatId: number;
}

export const ContactItem = ({ contact, chatId }: ContactItemProps) => {
  const isCutMessage = contact.message.length > 10;

  return (
    <Link
      key={contact.chatId}
      to={`/chat/${contact.chatId}`}
      className={`${cls.item} ${chatId === Number(contact.chatId) ? cls.active : ''}`}
    >
      <Flex direction='row' align='center' gap='8'>
        <ColorAvatar username={contact.username} />
        <Flex direction='column' align='start'>
          <span>{contact.username}</span>
          <span style={{ color: '#939393' }}>
            {isCutMessage
              ? `${contact.message.slice(0, 10)}...`
              : contact.message}
          </span>
        </Flex>
      </Flex>
    </Link>
  );
};
