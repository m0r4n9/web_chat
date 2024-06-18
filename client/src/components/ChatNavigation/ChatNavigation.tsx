import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { ContactItem } from '@/components/ChatNavigation';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchContacts, getContacts, getUserId } from '@/store';

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
            <Link to='/' className={cls.mainLwink}>
                Чаты
            </Link>

            <Stack spacing={2} className={cls.contactsList}>
                {contacts?.map((contact) => (
                    <ContactItem
                        key={contact.id}
                        contact={contact}
                        chatId={Number(chatId)}
                    />
                ))}
            </Stack>
        </div>
    );
};
