import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { ContactItem } from '@/components/ChatNavigation';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchContacts, getContacts } from '@/store/slice/Contacts';
import { getUserId } from '@/store/slice/User';

import cls from './ChatNavigation.module.scss';

export const ChatNavigation = () => {
    const { chatId } = useParams();
    const contacts = useSelector(getContacts);
    const userId = useSelector(getUserId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userId) dispatch(fetchContacts(userId));
    }, [userId, dispatch]);

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
