import * as React from 'react';

import { UserContext } from './UserContext';

export interface UserProviderProps {
  defaultUser?: User;
  children: React.ReactNode;
}

export const UserProvider = ({ defaultUser, children }: UserProviderProps) => {
  const [user, setUser] = React.useState<User>(defaultUser!);

  const value = React.useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
