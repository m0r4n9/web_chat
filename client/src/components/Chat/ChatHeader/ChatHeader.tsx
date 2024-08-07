import { Avatar, Flex, Group } from '@mantine/core';
import moment from 'moment';
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
      <div>
        <span className={cls.TypingDot}>.</span>
        <span className={cls.TypingDot}>.</span>
        <span className={cls.TypingDot}>.</span>
      </div>
    </Group>
  );
};

export const ChatHeader = ({ interlocutor }: ChatHeaderProps) => {
  const [isTyping, setIsTyping] = React.useState(false);
  const [timeAgo, setTimeAgo] = React.useState('');

  React.useEffect(() => {
    const updateTimeAgo = () =>
      setTimeAgo(moment(interlocutor?.lastPing).locale('ru').fromNow());

    updateTimeAgo();

    const interval = setInterval(updateTimeAgo, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [interlocutor?.lastPing]);

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
          {interlocutor?.isOnline ? (
            isTyping ? (
              <Typing />
            ) : (
              <span>Online</span>
            )
          ) : (
            <span>{timeAgo}</span>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
