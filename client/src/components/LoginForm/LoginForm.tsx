import { Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getAuthError } from '@/store';
import { authUser } from '@/store/slice/User/services/authUser.ts';
import { registerUser } from '@/store/slice/User/services/registerUser.ts';
import { userActions } from '@/store/slice/User/userSlice.ts';

import { ControllerInput } from '../ui/ContollerInput';
import cls from './LoginForm.module.scss';

type AuthInputs = {
    email: string;
    password: string;
    username?: string;
};

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useSelector(getAuthError);
    const [isRegistering, setIsRegistering] = useState(false);

    const { handleSubmit, control } = useForm<AuthInputs>({
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    });

    const onSubmit: SubmitHandler<AuthInputs> = (data) => {
        if (isRegistering) {
            dispatch(registerUser(data)).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    navigate('/');
                }
            });
        } else {
            dispatch(authUser(data)).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    navigate('/');
                }
            });
        }
    };

    const toggleMode = () => {
        if (error) dispatch(userActions.clearError());
        setIsRegistering((prev) => !prev);
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
                {isRegistering && (
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
                )}

                <Stack spacing={2} direction='column'>
                    <span>{error?.message}</span>
                    <Button type='submit' variant='contained'>
                        {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    <Button type='button' onClick={toggleMode}>
                        {isRegistering
                            ? 'Есть аккаунт? Войти'
                            : 'Нет аккаунта? Зарегистрироваться'}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};
