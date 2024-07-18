import { Avatar, Flex } from '@mantine/core';

import cls from './ChatHeader.module.scss';

interface ChatHeaderProps {
  interlocutor?: Interlocutor;
}

export const ChatHeader = ({ interlocutor }: ChatHeaderProps) => {
  return (
    <Flex direction='column' justify='center' className={cls.ChatHeader}>
      <Flex align='center' gap='sm'>
        <Avatar name={interlocutor?.username} color='initials' />
        <Flex direction='column'>
          <p>{interlocutor?.username}</p>
          <span>Была в сети недавно</span>
        </Flex>
      </Flex>
    </Flex>
  );
};
