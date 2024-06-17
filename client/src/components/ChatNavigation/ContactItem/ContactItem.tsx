import cls from '@/components/ChatNavigation/ChatNavigation.module.scss';
import { Stack } from '@mui/material';
import { ColorAvatar } from '@/components/ColorAvatar';
import { Link } from 'react-router-dom';
import { Contact } from '@/store/slice/Contacts/types.ts';

interface ContactItemProps {
    contact: Contact;
    chatId: number;
}

export const ContactItem = ({ contact, chatId }: ContactItemProps) => {
    return (
        <Link
            key={contact.chatId}
            to={`/${contact.chatId}`}
            className={`${cls.item} ${chatId === Number(contact.chatId) ? cls.active : ''}`}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <ColorAvatar username={contact.username} />
                <Stack direction="column" alignItems="start">
                    <span>{contact.username}</span>
                    <span style={{ color: '#939393' }}>Сообщение...</span>
                </Stack>
            </Stack>
        </Link>
    );
};
