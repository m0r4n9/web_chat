import { Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getAuthError } from '@/store';
import { authUser } from '@/store/slice/User/services/authUser.ts';
import { registerUser } from '@/store/slice/User/services/registerUser.ts';

import { ControllerInput } from '../ui/ContollerInput';
import cls from './LoginForm.module.scss';

type AuthInputs = {
    email: string;
    password: string;
    username?: string;
};

export const LoginForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useSelector(getAuthError);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AuthInputs>({
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
        setIsRegistering((prev) => !prev);
    };

    return (
        <Paper elevation={2} className={cls.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
                <Stack spacing={1}>
                    <ControllerInput
                        name='email'
                        control={control}
                        label='Email'
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </Stack>

                <Stack>
                    <ControllerInput
                        name='password'
                        type='password'
                        control={control}
                        label='Пароль'
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </Stack>

                {isRegistering && (
                    <Stack>
                        <ControllerInput
                            name='username'
                            control={control}
                            label='Имя пользователя'
                        />
                        {errors.username && (
                            <span>{errors.username.message}</span>
                        )}
                    </Stack>
                )}

                <Stack spacing={2} direction='column'>
                    <span>{error?.message}</span>
                    <Button type='submit' variant='contained'>
                        {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    <Button type='button' onClick={toggleMode}>
                        {isRegistering
                            ? 'Перейти к авторизации'
                            : 'Перейти к регистрации'}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};
