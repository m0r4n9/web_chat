import { Box, Button, Modal, Stack } from '@mui/material';
import * as React from 'react';

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

type PickUser = Pick<User, 'id' | 'username'>;

const ModalUsers = ({ users }: { users?: PickUser[] }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const handleStartChat = async (user: PickUser) => {
    //     try {
    //         let currentUserId = null;
    //         if (localStorage.getItem('user')) {
    //             currentUserId = localStorage.getItem('user');
    //         }
    //         const response = await createChat({
    //             currentUserId,
    //             userId: user.id,
    //         }).unwrap();
    //
    //         dispatch(
    //             contactActions.addContact({
    //                 chatId: response,
    //                 id: user.id,
    //                 username: user.username,
    //             }),
    //         );
    //
    //         navigate(`/${response}`);
    //     } catch (error) {
    //         console.error('Ошибка создания чата:', error);
    //     }
    // };

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
                        {users?.map((user) => (
                            <Stack
                                key={user.id}
                                direction='row'
                                justifyContent='space-between'
                            >
                                <ColorAvatar username={user.username} />
                                <span>{user.username}</span>
                                <Button onClick={() => {}}>Написать</Button>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
};

export const CreateChat = () => {

    return (
        <Stack
            alignContent='center'
            alignItems='center'
            style={{ width: '100%', height: '100%' }}
        >
            <h1>Выберите чат</h1>

            <Stack>
                <p>Начать диалог</p>
                {/*<ModalUsers users={users} />*/}
            </Stack>
        </Stack>
    );
};
