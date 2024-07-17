import { Button, Flex, Paper } from '@mantine/core';
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
    <Paper shadow='sm' className={cls.wrapper}>
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

        <Flex gap='md' direction='column'>
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
