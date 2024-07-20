import { Button, Flex, Textarea } from '@mantine/core';
import * as React from 'react';

import { socket } from '@/api';
import { SendIcon } from '@/assets/icons';

import cls from './MessageInput.module.scss';

interface MessageInputProps {
  sendMessage: (newMessage: string) => void;
  chatId: string;
}

export const MessageInput = React.memo(
  ({ sendMessage, chatId }: MessageInputProps) => {
    const [message, setMessage] = React.useState('');

    const sendMessageHandler = () => {
      sendMessage(message);
      setMessage('');
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessageHandler();
      }
    };



    return (
      <Flex align='center' gap='sm' className={cls.InputMessageContainer}>
        <Flex align='center' gap='sm' className={cls.MessageInput}>
          <Textarea
            size='sm'
            placeholder='Введите сообщение...'
            autosize
            maxRows={5}
            onFocus={() => {
              socket.emit('message:typing', {
                chatId: Number(chatId),
                isTyping: true,
              });
            }}
            onBlur={() => {
              socket.emit('message:typing', {
                chatId: Number(chatId),
                isTyping: false,
              });
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cls.Textarea}
          />
          <Button
            variant='transparent'
            onClick={sendMessageHandler}
            disabled={!message}
          >
            <SendIcon />
          </Button>
        </Flex>
      </Flex>
    );
  },
);
