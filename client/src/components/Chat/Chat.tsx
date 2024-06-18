import { CreateChat } from '@/components/CreateChat';

import cls from './Chat.module.scss';
import { Messages } from './Messages/Messages.tsx';

export const Chat = ({ chatId }: { chatId?: string }) => {
    if (!chatId) return <CreateChat />;

    return (
        <div className={cls.Chat}>
            <Messages chatId={Number(chatId)} />
        </div>
    );
};
