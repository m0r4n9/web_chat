import { Flex } from '@mantine/core';

import { FormContainer } from '@/components/Auth';

export const AuthPage = () => {
  return (
    <Flex justify='center' align='center' style={{ height: '50svh' }}>
      <FormContainer />
    </Flex>
  );
};
