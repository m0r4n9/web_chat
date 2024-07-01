import { createContext } from "react";

export interface UserContextProps {
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: undefined!,
    setUser: () => {}
})