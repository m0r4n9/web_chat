import { Anchor, Button, Divider, Group } from '@mantine/core';
import { IconLock, IconMail } from '@tabler/icons-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ControllerInput } from '@/components/ui/ContollerInput';
import { useUser } from '@/context/user';
import { usePostSignInMutation } from '@/utils/api';

import cls from '../AuthForm.module.scss';

type SignInFields = {
  email: string;
  password: string;
};

type SignInFormProps = {
  toggleStage: () => void;
};

export const SignInForm = ({ toggleStage }: SignInFormProps) => {
  const navigate = useNavigate();
  const signIn = usePostSignInMutation();
  const userContext = useUser();

  const { handleSubmit, control } = useForm<SignInFields>({
    defaultValues: {
      email: 'test@test.com',
      password: '123',
    },
  });

  const onSubmit: SubmitHandler<SignInFields> = async (data) => {
    const user = await signIn.mutateAsync(data);

    if (user) {
      if (user.accessToken) localStorage.setItem('token', user.accessToken);

      userContext.setUser(user);
      navigate('/', {
        replace: true,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <Divider label='Авторизация' labelPosition='center' my='lg' />
      <ControllerInput
        name='email'
        control={control}
        label='Электронная почта'
        placeholder='Введите почту'
        rules={{ required: 'Это поле обязательно' }}
        leftSection={<IconMail size={18} />}
        leftSectionPointerEvents='none'
      />
      <ControllerInput
        name='password'
        type='password'
        control={control}
        label='Пароль'
        placeholder='Введите пароль'
        rules={{ required: 'Это поле обязательно' }}
        leftSection={<IconLock size={18} />}
        leftSectionPointerEvents='none'
      />

      <Group gap='md' justify='space-between'>
        {signIn.isError && <div>{signIn.error.response?.data.message}</div>}
        <Anchor
          component='button'
          type='button'
          c='dimmed'
          onClick={toggleStage}
          size='xs'
        >
          Нет аккаунта? Зарегистрироваться
        </Anchor>
        <Button type='submit' variant='default'>
          Войти
        </Button>
      </Group>
    </form>
  );
};
