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
    const messageEl = useRef(null);

    useEffect(() => {
        if (messageEl && messageEl.current) {
            // @ts-ignore
            messageEl.current.addEventListener('DOMNodeInserted', (event) => {
                const { currentTarget: target } = event;
                target?.scroll({
                    top: target.scrollHeight,
                    behavior: 'smooth',
                });
            });
        }
    }, []);

    return (
        <div className={cls.wrapper} ref={messageEl}>
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
