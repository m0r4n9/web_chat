import { Text } from '@mantine/core';
import clsx from 'clsx';

import cls from './Message.module.scss';

interface MessageProps {
  message: string;
  isMine?: boolean;
}

export const Message = (props: MessageProps) => {
  const { message, isMine = false } = props;

  return (
    <div className={clsx(cls.message, isMine && `${cls.isMine}`)}>
      <Text>{message}</Text>
    </div>
  );
};
