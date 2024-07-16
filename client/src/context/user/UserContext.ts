import * as React from 'react';

export interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = React.createContext<UserContextProps>({
  user: undefined!,
  setUser: () => {},
});
