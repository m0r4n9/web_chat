import { useParams } from 'react-router-dom';

import { Chat } from '@/components/Chat';

export const ChatPage = () => {
  const { chatId } = useParams();

  if (!chatId) {
    return <div>Chat Id не указан.</div>;
  }

  return <Chat chatId={chatId} />;
};
