import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, TextField } from '@mui/material';
import { memo, useState } from 'react';

import cls from './MessageInput.module.scss';

interface MessageInputProps {
    sendMessage: (newMessage: string) => void;
}

export const MessageInput = memo(({ sendMessage }: MessageInputProps) => {
    const [message, setMessage] = useState('');

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

    return (
        <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            className={cls.messageInput}
        >
            <TextField
                fullWidth
                id='outlined-multiline-flexible'
                multiline
                size='small'
                placeholder='Введите сообщение...'
                maxRows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button onClick={sendMessageHandler} disabled={!message}>
                <SendIcon />
            </Button>
        </Stack>
    );
});
