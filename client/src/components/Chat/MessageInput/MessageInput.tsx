import cls from './MessageInput.module.scss';
import { Button, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

interface MessageInputProps {
    sendMessage: (newMessage: string) => void;
}

export const MessageInput = ({ sendMessage }: MessageInputProps) => {
    const [newMessage, setNewMessage] = useState<string>('');

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className={cls.messageInput}
        >
            <TextField
                fullWidth
                id="outlined-multiline-flexible"
                multiline
                variant="filled"
                size="small"
                placeholder="Введите сообщение..."
                maxRows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                inputProps={{
                    className: cls.input,
                }}
            />
            <Button
                onClick={() => {
                    sendMessage(newMessage);
                    setNewMessage('');
                }}
            >
                <SendIcon />
            </Button>
        </Stack>
    );
};
