import { Skeleton } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';

import { $api } from '@/api/api.ts';
import { MessageInput } from '@/components/Chat/MessageInput/MessageInput.tsx';
import { MessageList } from '@/components/Chat/MessageList/MessageList.tsx';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { contactActions, getContacts } from '@/store/slice/Contacts';
import { getUserData, getUserId } from '@/store/slice/User';

import { Message } from '../Message';
import cls from './Chat.module.scss';

interface Message {
    chatId: number;
    senderId: number;
    content: string;
    username?: string;
}

const MessagesSkeleton = () => {
    return (
        <div className={cls.list}>
            <Skeleton animation='wave' height={48} width={140} />
            <Skeleton animation='wave' height={48} width={140} />
            <Skeleton animation='wave' height={48} width={140} />
            <Skeleton animation='wave' height={48} width={140} />
            <Skeleton animation='wave' height={48} width={140} />
        </div>
    );
};

const SERVER_URL = import.meta.env.VITE_DEV_SERVER_URL;

export const Chat = ({ chatId }: { chatId: string }) => {
    const dispatch = useAppDispatch();
    const userId = useSelector(getUserId);
    const userData = useSelector(getUserData);
    const contacts = useSelector(getContacts);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        async function fetchMessages() {
            setIsLoading(true);
            await $api
                .get(`/messages/${chatId}`)
                .then((response) => setMessages(response.data))
                .catch((error) => setError(error))
                .finally(() => setIsLoading(false));
        }

        fetchMessages();
    }, [chatId]);

    useEffect(() => {
        socket.current = io(SERVER_URL);

        socket.current.on('message', (message: Message) => {
            if (chatId === message.chatId.toString()) {
                setMessages((prevMessages) => [...prevMessages, message]);
            } else {
                if (
                    message.senderId !== Number(userId) &&
                    !contacts?.find(
                        (contact) => contact.id == message.senderId.toString(),
                    )
                ) {
                    dispatch(
                        contactActions.addContact({
                            chatId: message.chatId,
                            id: message.senderId.toString(),
                            username: message.username?.toString() ?? '123',
                        }),
                    );
                }
            }
        });

        return () => {
            if (socket.current && socket.current?.active)
                socket.current?.disconnect();
        };
    }, [chatId, userId, dispatch, contacts]);

    const sendMessage = useCallback(
        (newMessage: string) => {
            if (newMessage.trim()) {
                socket.current?.emit('message', {
                    chatId: chatId,
                    senderId: Number(userId),
                    content: newMessage,
                    username: userData?.username,
                });
            }
        },
        [chatId, userData?.username, userId],
    );

    return (
        <div className={cls.Chat}>
            {error && <h2>Ошибка: ${error}</h2>}
            {isLoading ? (
                <MessagesSkeleton />
            ) : (
                <MessageList messages={messages} userId={Number(userId)} />
            )}
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
};
