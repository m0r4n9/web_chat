import cls from './ChatNavigation.module.scss';
import { Link, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getContacts, fetchContacts, getUserId } from '@/store';
import { ContactItem } from '@/components/ChatNavigation';

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
            <Link to="/" className={cls.mainLink}>
                Чаты
            </Link>

            <Stack spacing={2} className={cls.contactsList}>
                {contacts?.map((contact) => (
                    <ContactItem contact={contact} chatId={Number(chatId)} />
                ))}
            </Stack>
        </div>
    );
};
