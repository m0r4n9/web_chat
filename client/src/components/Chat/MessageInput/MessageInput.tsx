import SendIcon from '@mui/icons-material/Send';
import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import cls from './MessageInput.module.scss';

interface MessageInputProps {
    sendMessage: (newMessage: string) => void;
}

export const MessageInput = ({ sendMessage }: MessageInputProps) => {
    const [message, setMessage] = useState('');

    const sendMessageHandler = () => {
        sendMessage(message);
        setMessage('');
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
                variant='filled'
                size='small'
                placeholder='Введите сообщение...'
                maxRows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                onClick={sendMessageHandler}
                disabled={!message}
            >
                <SendIcon />
            </Button>
        </Stack>
    );
};
