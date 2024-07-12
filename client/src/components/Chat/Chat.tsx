import {
  InfiniteData,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { socket } from '@/api';
import { MessageList } from '@/components/Chat/MessageList/MessageList.tsx';
import { UserContext } from '@/context/user';
import { useGetChatMembers } from '@/utils/api';

import cls from './Chat.module.scss';
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
  const { user } = useContext(UserContext);
  const { data: members } = useGetChatMembers(chatId);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (members && !members.find((member) => member.userId === user.id)) {
      navigate('/', {
        replace: true,
      });
    }
  }, [members, navigate, user.id]);

  useEffect(() => {
    socket.on('message:sent', (message: Message) => {
      if (chatId === message.chatId.toString()) {
        addMessage({ queryClient, chatId, message });
      }
    });
  }, [chatId, queryClient]);

  const sendMessage = useCallback(
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
    <div className={cls.Chat}>
      <MessageList userId={user.id} chatId={Number(chatId)} />
      <MessageInput sendMessage={sendMessage} chatId={chatId} />
    </div>
  );
};
