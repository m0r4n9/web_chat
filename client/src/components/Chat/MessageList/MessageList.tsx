import { useEffect, useRef } from 'react';

import { Message } from '@/components/Message';

import cls from './MessageList.module.scss';

interface Message {
    senderId: number;
    content: string;
    chatId: number;
    username?: string;
}

export const MessageList = ({
    messages,
    userId,
}: {
    messages: Message[];
    userId: number;
}) => {
    const messagesElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesElement.current) {
            messagesElement.current.scrollTop =
                messagesElement.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={cls.wrapper} ref={messagesElement}>
            <div className={cls.list}>
                {messages.map((message, index) => (
                    <Message
                        key={`${index}-${message.senderId}`}
                        message={message.content}
                        isMine={userId === message.senderId}
                    />
                ))}
            </div>
        </div>
    );
};
