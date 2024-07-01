import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ContactItem } from '@/components/ChatNavigation';
import { UserContext } from '@/context/user';
import { useGetContactsQuery } from '@/utils/api';

import cls from './ChatNavigation.module.scss';

export const ChatNavigation = () => {
    const { chatId } = useParams();
    const { user } = useContext(UserContext);
    const { data: contacts } = useGetContactsQuery(user.id);

    return (
        <div className={cls.ChatNavigation}>
            <Link to='/' className={cls.homeLink}>
                Чаты
            </Link>

            <div className={cls.scrollContainer}>
                <ul className={cls.contactsList}>
                    {contacts?.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            chatId={Number(chatId)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
