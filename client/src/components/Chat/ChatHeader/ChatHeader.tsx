import { Flex } from '@/components/ui/Flex';

import cls from './ChatHeader.module.scss';

interface ChatHeaderProps {
  interlocutor?: Interlocutor;
}

export const ChatHeader = ({ interlocutor }: ChatHeaderProps) => {
  return (
    <Flex direction='column' className={cls.ChatHeader}>
      <div>{interlocutor?.username}</div>
    </Flex>
  );
};
