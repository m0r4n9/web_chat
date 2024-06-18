import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { $api } from '@/api/api.ts';
import { MessageList } from '@/components/Chat/MessageList/MessageList.tsx';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { contactActions, getContacts, getUserData, getUserId } from '@/store';

import { MessageInput } from '../MessageInput/MessageInput.tsx';

interface Message {
    senderId: number;
    content: string;
    chatId: number;
    username?: string;
}

interface MessagesProps {
    chatId: number;
}

export const Messages = ({ chatId }: MessagesProps) => {
    const dispatch = useAppDispatch();
    const userId = useSelector(getUserId);
    const userData = useSelector(getUserData);
    const contacts = useSelector(getContacts);
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = useRef<any>(null);

    useEffect(() => {
        async function fetchMessages() {
            const response = await $api.get(`/messages/${chatId}`);
            setMessages(response.data);
        }

        fetchMessages();
    }, [chatId]);

    useEffect(() => {
        socket.current = io('http://localhost:8080');

        socket.current.on('message', (message: Message) => {
            if (chatId === message.chatId) {
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
            socket.current.disconnect();
        };
    }, [chatId, userId, dispatch, contacts]);

    const sendMessage = useCallback(
        (newMessage: string) => {
            if (newMessage.trim()) {
                socket.current.emit('message', {
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
        <div>
            <MessageList messages={messages} userId={Number(userId)} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
};
