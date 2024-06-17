import * as React from 'react';
import { Box, Button, Modal, Stack } from '@mui/material';
import { useGetUsersQuery } from '@/store/api/userApi.ts';
import { ColorAvatar } from '../ColorAvatar';
import { useNavigate } from 'react-router-dom';
import { useCreateChatMutation } from '@/store/api/chatApi';
import { useSelector } from 'react-redux';
import { getUserId } from '@/store/slice/User/user-selector.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { contactActions } from '@/store/slice/Contacts/contactsSlice.ts';
import { Contact } from '@/store/slice/Contacts/types.ts';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden',
};

const ModalUsers = ({ users }: { users?: any[] }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const [createChat] = useCreateChatMutation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleStartChat = async (user: Contact) => {
        try {
            let currentUserId = null;
            if (localStorage.getItem('user')) {
                currentUserId = localStorage.getItem('user');
            }
            const response = await createChat({
                currentUserId,
                userId: user.id,
            }).unwrap();

            dispatch(
                contactActions.addContact({
                    chatId: response,
                    id: user.id,
                    username: user.username,
                }),
            );

            navigate(`/${response}`);
        } catch (error) {
            console.error('Ошибка создания чата:', error);
        }
    };

    return (
        <div>
            <Button onClick={handleOpen}>Выбрать пользователя</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Выберите пользователя</h2>
                    <Stack spacing={1}>
                        {users?.map((user) => (
                            <Stack
                                key={user.userId}
                                direction="row"
                                justifyContent="space-between"
                            >
                                <ColorAvatar username={user.username} />
                                <span>{user.username}</span>
                                <Button onClick={() => handleStartChat(user)}>
                                    Написать
                                </Button>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};

export const CreateChat = () => {
    const userId = useSelector(getUserId);
    const { data: users } = useGetUsersQuery(userId);

    return (
        <Stack
            alignContent="center"
            alignItems="center"
            style={{ width: '100%', height: '100%' }}
        >
            <h1>Выберите чат</h1>

            <Stack>
                <p>Начать диалог</p>
                <ModalUsers users={users} />
            </Stack>
        </Stack>
    );
};
