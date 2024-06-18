import { ErrorInterface } from '@/types/Error.ts';

export interface User {
    id: string;
    username: string;
    password: string;
}

export interface UserSchema {
    isLoading: boolean;
    user?: User;
    error?: ErrorInterface;
}
