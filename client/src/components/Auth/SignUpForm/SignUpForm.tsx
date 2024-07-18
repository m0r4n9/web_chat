import { Anchor, Button, Divider, Group } from '@mantine/core';
import { IconLock, IconMail, IconUser } from '@tabler/icons-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ControllerInput } from '@/components/ui/ContollerInput';
import { usePostSignUpMutation } from '@/utils/api';

import cls from '../AuthForm.module.scss';

type SignUpFields = {
  email: string;
  password: string;
  username: string;
};

type SignUpFormProps = {
  toggleStage: () => void;
};

export const SignUpForm = ({ toggleStage }: SignUpFormProps) => {
  const signUp = usePostSignUpMutation();

  const { handleSubmit, control } = useForm<SignUpFields>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    await signUp.mutateAsync(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <Divider label='Регистрация' labelPosition='center' my='lg' />
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
      <ControllerInput
        name='username'
        control={control}
        label='Имя пользователя'
        placeholder='Введите имя пользователя'
        rules={{
          required: 'Это поле обязательно',
          minLength: {
            value: 4,
            message: 'Имя пользователя должно содержать минимум 4 символа',
          },
        }}
        leftSection={<IconUser size={18} />}
        leftSectionPointerEvents='none'
      />

      <Group gap='md' justify='space-between'>
        {signUp.isError && <div>{signUp.error.response?.data.message}</div>}
        <Anchor
          component='button'
          type='button'
          c='dimmed'
          onClick={toggleStage}
          size='xs'
        >
          Уже есть аккаунт? Войти
        </Anchor>
        <Button type='submit' variant='default'>
          Зарегистрироваться
        </Button>
      </Group>
    </form>
  );
};
