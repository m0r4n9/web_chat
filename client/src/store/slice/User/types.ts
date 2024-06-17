export interface User {
    id: string;
    username: string;
    password: string;
}

export interface UserSchema {
    isLoading: boolean;
    user?: User;
    _inited: boolean;
}
