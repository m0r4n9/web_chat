import { Paper } from '@mantine/core';
import * as React from 'react';

import cls from './AuthForm.module.scss';
import { SignInForm } from './SignInForm/SignInForm.tsx';
import { SignUpForm } from './SignUpForm/SignUpForm.tsx';

type AuthStage = 'signIn' | 'signUp';

export const AuthFormContainer = () => {
  const [stage, setStage] = React.useState<AuthStage>('signIn');

  const toggleStage = React.useCallback(
    () =>
      setStage((prevState) => (prevState === 'signIn' ? 'signUp' : 'signIn')),
    [],
  );

  const content =
    stage === 'signIn' ? (
      <SignInForm toggleStage={toggleStage} />
    ) : (
      <SignUpForm toggleStage={toggleStage} />
    );

  return (
    <Paper p='md' className={cls.wrapper}>
      {content}
    </Paper>
  );
};
