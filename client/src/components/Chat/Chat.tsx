
import { MessageList } from '@/components/Chat/MessageList/MessageList.tsx';

import cls from './Chat.module.scss';


// const SERVER_URL = import.meta.env.VITE_DEV_SERVER_URL;

export const Chat = ({ chatId }: { chatId: string }) => {
    // const dispatch = useAppDispatch();
    // const userData = useSelector(getUserData);
    // const contacts = useSelector(getContacts);
    // const socket = useRef<Socket | null>(null);

    // useEffect(() => {
    //     socket.current = io(SERVER_URL);

    //     socket.current.on('message', (message: Message) => {
    //         if (chatId === message.chatId.toString()) {
    //             setMessages((prevMessages) => [...prevMessages, message]);
    //         } else {
    //             if (
    //                 message.senderId !== Number(userId) &&
    //                 !contacts?.find(
    //                     (contact) => contact.id == message.senderId.toString(),
    //                 )
    //             ) {
    //                 dispatch(
    //                     contactActions.addContact({
    //                         chatId: message.chatId,
    //                         id: message.senderId.toString(),
    //                         username: message.username?.toString() ?? '123',
    //                     }),
    //                 );
    //             }
    //         }
    //     });

    //     return () => {
    //         if (socket.current && socket.current?.active)
    //             socket.current?.disconnect();
    //     };
    // }, [chatId, userId, dispatch, contacts]);

    // const sendMessage = useCallback(
    //     (newMessage: string) => {
    //         if (newMessage.trim()) {
    //             socket.current?.emit('message', {
    //                 chatId: chatId,
    //                 senderId: Number(userId),
    //                 content: newMessage,
    //                 username: userData?.username,
    //             });
    //         }
    //     },
    //     [chatId, userData?.username, userId],
    // );

    return (
        <div className={cls.Chat}>
                {/*<MessageList*/}
                {/*    userId={Number(userId)}*/}
                {/*    chatId={Number(chatId)}*/}
                {/*/>*/}
            {/* <MessageInput sendMessage={sendMessage} /> */}
        </div>
    );
};
