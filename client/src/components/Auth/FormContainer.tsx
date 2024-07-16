import * as React from 'react';

import { SignInForm } from './SignInForm/SignInForm.tsx';
import { SignUpForm } from './SignUpForm/SignUpForm.tsx';

type AuthStage = 'signIn' | 'signUp';

export const FormContainer = () => {
  const [stage, setStage] = React.useState<AuthStage>('signIn');

  const toggleStage = React.useCallback(
    () =>
      setStage((prevState) => (prevState === 'signIn' ? 'signUp' : 'signIn')),
    [],
  );

  if (stage === 'signIn') {
    return <SignInForm toggleStage={toggleStage} />;
  }

  return <SignUpForm toggleStage={toggleStage} />;
};
