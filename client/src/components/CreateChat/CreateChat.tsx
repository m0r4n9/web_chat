import { Box, Button, Modal, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '@/context/user';
import { useGetUnmessagedUsers, usePostCreateChatMutation } from '@/utils/api';

import { ColorAvatar } from '../ColorAvatar';

const style = {
    position: 'absolute' as const,
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

type UserOmit = Omit<User, 'accessToken'>;

const ModalUsers = ({ users }: { users?: UserOmit[] }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const createChatMutation = usePostCreateChatMutation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleStartChat = async (userId: number) => {
        try {
            const response = await createChatMutation.mutateAsync({
                currentUserId: user.id,
                userId,
            });

            navigate(`/chat/${response}`);
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
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <h2>Выберите пользователя</h2>
                    <Stack spacing={1}>
                        {users?.length ? (
                            users.map((user) => (
                                <Stack
                                    key={user.id}
                                    direction='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <ColorAvatar username={user.username} />
                                    <span>{user.username}</span>
                                    <Button
                                        onClick={() => handleStartChat(user.id)}
                                    >
                                        Написать
                                    </Button>
                                </Stack>
                            ))
                        ) : (
                            <div>Нет пользователей, которым можно написать</div>
                        )}
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};

export const CreateChat = () => {
    const { user } = useContext(UserContext);
    const { data: users } = useGetUnmessagedUsers(user.id);

    return (
        <Stack
            alignContent='center'
            alignItems='center'
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
