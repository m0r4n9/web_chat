import { useParams } from 'react-router-dom';

import { Chat } from '@/components/Chat';

export const ChatPage = () => {
    const { chatId } = useParams();

    return <Chat chatId={chatId} />;
};
