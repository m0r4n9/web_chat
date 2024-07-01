import { Button, Paper, Stack } from '@mui/material';
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
                <ControllerInput
                    name='username'
                    control={control}
                    label='Имя пользователя'
                    rules={{
                        required: 'Это поле обязательно',
                        minLength: {
                            value: 4,
                            message:
                                'Имя пользователя должно содержать минимум 4 символа',
                        },
                    }}
                />

                <Stack spacing={2} direction='column'>
                    {signUp.isError && (
                        <div>{signUp.error.response?.data.message}</div>
                    )}
                    <Button type='submit' variant='contained'>
                        Зарегистрироваться
                    </Button>
                    <Button type='button' onClick={toggleStage}>
                        Войти в аккаунт
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};
