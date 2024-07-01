import { CircularProgress, Stack } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { Message } from '@/components/Message';
import { useMessagesQuery } from '@/utils/api';

import cls from './MessageList.module.scss';

export const MessageList = ({
    userId,
    chatId,
}: {
    userId: number;
    chatId: number;
}) => {
    const messagesElement = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef(0);
    const scrollHeightBeforeFetch = useRef(0);
    const { ref, inView } = useInView({
        threshold: 1,
    });

    const { data, isSuccess, isPending, isFetchingNextPage, fetchNextPage } =
        useMessagesQuery(chatId);

    useEffect(() => {
        if (inView) {
            const container = messagesElement.current;
            if (container) {
                scrollHeightBeforeFetch.current = container.scrollHeight;
                scrollPositionRef.current = container.scrollTop;
            }
            fetchNextPage();
        }
    }, [inView, fetchNextPage]);

    useEffect(() => {
        const container = messagesElement.current;
        if (container && data) {
            const newItemsHeight =
                container.scrollHeight - scrollHeightBeforeFetch.current;
            container.scrollTop = scrollPositionRef.current + newItemsHeight;

            if (data.pages.length > 1) container.scrollTop -= 40;
        }
    }, [data]);

    if (isPending) {
        return (
            <div
                className={cls.wrapper}
                ref={messagesElement}
                key='messages-chat'
            >
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    height='100%'
                >
                    <CircularProgress />
                </Stack>
            </div>
        );
    }

    return (
        <div className={cls.wrapper} ref={messagesElement} key='messages-chat'>
            <Stack spacing={1} className={cls.list}>
                <div ref={ref}></div>
                {isFetchingNextPage && (
                    <Stack alignItems='center'>
                        <CircularProgress />
                    </Stack>
                )}
                {isSuccess &&
                    data.pages.map((messages, i) =>
                        messages.data.map((message, index) => (
                            <Message
                                key={`${i}-${index}-${message.senderId}`}
                                message={message.content}
                                isMine={userId === message.senderId}
                            />
                        )),
                    )}
            </Stack>
        </div>
    );
};
