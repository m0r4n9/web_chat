import { Flex } from '@mantine/core';
import {
  InfiniteData,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { socket } from '@/api';
import { MessageList } from '@/components/Chat/MessageList/MessageList.tsx';
import { useUser } from '@/context/user';
import { useGetDataChat } from '@/utils/api';

import cls from './Chat.module.scss';
import { ChatHeader } from './ChatHeader/ChatHeader.tsx';
import { MessageInput } from './MessageInput/MessageInput';

function addMessage({
  queryClient,
  chatId,
  message,
}: {
  queryClient: QueryClient;
  chatId: string;
  message: Pick<Message, 'chatId' | 'content'>;
}) {
  queryClient.setQueryData(
    ['chat', `${chatId}`],
    (oldData: InfiniteData<MessagesChatApiResponse>) => {
      if (!oldData) {
        return {
          pages: [{ messages: [message], isLastPage: false }],
          pageParams: [1],
        };
      }

      const newPages = oldData.pages.map((page, index) => {
        if (index === 0) {
          return {
            ...page,
            data: [...page.data, message],
          };
        }
        return page;
      });

      return {
        ...oldData,
        pages: newPages,
      };
    },
  );
}

export const Chat = ({ chatId }: { chatId: string }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: chatData } = useGetDataChat(chatId);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (chatData && !chatData.access) {
      navigate('/', {
        replace: true,
      });
    }
  }, [chatData, navigate]);

  React.useEffect(() => {
    socket.on('message:sent', (message: Message) => {
      if (chatId === message.chatId.toString()) {
        addMessage({ queryClient, chatId, message });
      }
    });
  }, [chatId, queryClient]);

  const sendMessage = React.useCallback(
    (newMessage: string) => {
      if (newMessage.trim()) {
        const message = {
          chatId: Number(chatId),
          content: newMessage,
          senderId: user.id,
        };

        addMessage({ queryClient, chatId, message });

        socket.emit('message:send', message);
      }
    },
    [chatId, user.id, queryClient],
  );

  return (
    <Flex direction='column' align='center' flex='1' className={cls.Chat}>
      <ChatHeader interlocutor={chatData?.interlocutor} />
      <Flex direction='column' className={cls.MessageContainer}>
        <MessageList userId={user.id} chatId={Number(chatId)} />
        <MessageInput sendMessage={sendMessage} chatId={chatId} />
      </Flex>
    </Flex>
  );
};
