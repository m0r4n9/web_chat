import { Flex, Text, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router-dom';

import { ColorAvatar } from '@/components/ColorAvatar';

import cls from '../ChatNavigation.module.scss';

interface ContactItemProps {
  contact: Contact;
  chatId: number;
}

export const ContactItem = ({ contact, chatId }: ContactItemProps) => {
  const theme = useMantineTheme();
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
          <Text>{contact.username}</Text>
          <Text c={theme.colors.dark[2]} span>
            {isCutMessage
              ? `${contact.message.slice(0, 10)}...`
              : contact.message}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};
