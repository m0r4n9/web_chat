import { ReactNode, useMemo, useState } from 'react';

import { UserContext } from './UserContext';

export interface UserProviderProps {
    defaultUser?: User;
    children: ReactNode;
}

export const UserProvider = ({ defaultUser, children }: UserProviderProps) => {
    const [user, setUser] = useState<User>(defaultUser!);

    const value = useMemo(() => ({ user, setUser }), [user]);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
