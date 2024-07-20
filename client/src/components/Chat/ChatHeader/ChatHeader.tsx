import { Avatar, Flex, Group } from '@mantine/core';
import * as React from 'react';

import { socket } from '@/api';

import cls from './ChatHeader.module.scss';

interface ChatHeaderProps {
  interlocutor?: Interlocutor;
}

const Typing = () => {
  return (
    <Group gap='0' className={cls.Typing}>
      Печатает
      <div >
        <span className={cls.TypingDot}>.</span>
        <span className={cls.TypingDot}>.</span>
        <span className={cls.TypingDot}>.</span>
      </div>
    </Group>
  );
};

export const ChatHeader = ({ interlocutor }: ChatHeaderProps) => {
  const [isTyping, setIsTyping] = React.useState(true);

  React.useEffect(() => {
    socket.on(
      'message:typing',
      (payload: { isTyping: boolean; userId: number }) => {
        setIsTyping(payload.isTyping);
      },
    );
  }, []);

  return (
    <Flex direction='column' justify='center' className={cls.ChatHeader}>
      <Flex align='center' gap='sm'>
        <Avatar name={interlocutor?.username} color='initials' />
        <Flex direction='column'>
          <p>{interlocutor?.username}</p>
          {isTyping ? <Typing /> : <span>Была в сети недавно</span>}
        </Flex>
      </Flex>
    </Flex>
  );
};
