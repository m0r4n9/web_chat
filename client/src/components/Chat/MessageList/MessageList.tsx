import { Flex, Loader, ScrollArea } from '@mantine/core';
import * as React from 'react';
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
  const messagesElement = React.useRef<HTMLDivElement>(null);
  const scrollPositionRef = React.useRef(0);
  const scrollHeightBeforeFetch = React.useRef(0);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isSuccess, isPending, isFetchingNextPage, fetchNextPage } =
    useMessagesQuery(chatId);

  React.useEffect(() => {
    if (inView) {
      const container = messagesElement.current;
      if (container) {
        scrollHeightBeforeFetch.current = container.scrollHeight;
        scrollPositionRef.current = container.scrollTop;
      }
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  React.useEffect(() => {
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
      <div className={cls.wrapper} ref={messagesElement} key='messages-chat'>
        <Flex align='center' content='center'>
          <Loader />
        </Flex>
      </div>
    );
  }

  return (
    <ScrollArea.Autosize
      className={cls.wrapper}
      ref={messagesElement}
      type='auto'
      scrollbars='y'
      key='messages-chat'
    >
      <Flex gap='sm' direction='column' className={cls.list}>
        <div ref={ref}></div>
        {isFetchingNextPage && (
          <Flex align='center'>
            <Loader />
          </Flex>
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
      </Flex>
    </ScrollArea.Autosize>
  );
};
