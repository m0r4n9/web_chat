import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import * as React from 'react';

import { socket } from '@/api';
import { Flex } from '@/components/ui/Flex';

import cls from './MessageInput.module.scss';

interface MessageInputProps {
  sendMessage: (newMessage: string) => void;
  chatId: string;
}

export const MessageInput = React.memo(
  ({ sendMessage, chatId }: MessageInputProps) => {
    const [message, setMessage] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const sendMessageHandler = () => {
      sendMessage(message);
      setMessage('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessageHandler();
      }
    };

    React.useEffect(() => {
      socket.on(
        'message:typing',
        (payload: { isTyping: boolean; userId: number }) => {
          setIsTyping(payload.isTyping);
        },
      );
    }, []);

    return (
      <Flex align='center' gap='8' className={cls.InputMessageContainer}>
        {isTyping && <p>Typing</p>}
        <Flex direction='row' gap='8' className={cls.MessageInput}>
          <TextField
            fullWidth
            id='outlined-multiline-flexible'
            multiline
            size='small'
            placeholder='Введите сообщение...'
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
          />
          <Button onClick={sendMessageHandler} disabled={!message}>
            <SendIcon />
          </Button>
        </Flex>
      </Flex>
    );
  },
);
