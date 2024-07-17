import { Box, Button, Flex, Modal } from '@mantine/core';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/context/user';
import { useGetUnmessagedUsers, usePostCreateChatMutation } from '@/utils/api';

import { ColorAvatar } from '../ColorAvatar';

type UserOmit = Omit<User, 'accessToken'>;

const ModalUsers = ({ users }: { users?: UserOmit[] }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [open, setOpen] = React.useState(false);
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
    <Box>
      <Button onClick={handleOpen}>Выбрать пользователя</Button>
      <Modal
        opened={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box>
          <h2>Выберите пользователя</h2>
          <Flex gap='sm'>
            {users?.length ? (
              users.map((user) => (
                <Flex
                  key={user.id}
                  direction='row'
                  justify='space-between'
                  align='center'
                >
                  <ColorAvatar username={user.username} />
                  <span>{user.username}</span>
                  <Button onClick={() => handleStartChat(user.id)}>
                    Написать
                  </Button>
                </Flex>
              ))
            ) : (
              <div>Нет пользователей, которым можно написать</div>
            )}
          </Flex>
        </Box>
      </Modal>
    </Box>
  );
};

export const CreateChat = () => {
  const { user } = useUser();
  const { data: users } = useGetUnmessagedUsers(user.id);

  return (
    <Flex justify='center' align='center' direction='column' gap='md' flex='1'>
      <h1>Выберите чат</h1>

      <Flex direction='column' align='center' gap='sm'>
        <p>Начать диалог</p>
        <ModalUsers users={users} />
      </Flex>
    </Flex>
  );
};
