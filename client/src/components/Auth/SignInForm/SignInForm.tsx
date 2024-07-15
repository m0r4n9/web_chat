import { Button, Paper } from '@mui/material';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ControllerInput } from '@/components/ui/ContollerInput';
import { Flex } from '@/components/ui/Flex';
import { UserContext } from '@/context/user';
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
  const userContext = useContext(UserContext);

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
    <Paper elevation={1} className={cls.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
        <ControllerInput
          name='email'
          control={control}
          label='Электронная почта'
          rules={{ required: 'Это поле обязательно' }}
        />
        <ControllerInput
          name='password'
          type='password'
          control={control}
          label='Пароль'
          rules={{ required: 'Это поле обязательно' }}
        />

        <Flex gap='12' direction='column'>
          {signIn.isError && <div>{signIn.error.response?.data.message}</div>}
          <Button type='submit' variant='contained'>
            Войти
          </Button>
          <Button type='button' onClick={toggleStage}>
            Нет аккаунта? Зарегистрироваться'
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
