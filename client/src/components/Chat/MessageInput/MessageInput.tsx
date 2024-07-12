import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, TextField } from '@mui/material';
import { memo, useEffect,useState } from 'react';

import { socket } from '@/api';

import cls from './MessageInput.module.scss';

interface MessageInputProps {
  sendMessage: (newMessage: string) => void;
  chatId: string;
}

export const MessageInput = memo(
  ({ sendMessage, chatId }: MessageInputProps) => {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

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

    useEffect(() => {
      socket.on(
        'message:typing',
        (payload: { isTyping: boolean; userId: number }) => {
          setIsTyping(payload.isTyping);
        },
      );
    }, []);

    return (
      <Stack alignItems='center' spacing={1} className={cls.inputContainer}>
        {isTyping && <p>Typing</p>}
        <Stack
          direction='row'
          spacing={1}
          useFlexGap
          className={cls.messageInput}
        >
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
        </Stack>
      </Stack>
    );
  },
);
