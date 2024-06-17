import { StateSchema } from '@/store/StateSchema';

export const getUserData = (state: StateSchema) => state.user.user;
export const getUserId = (state: StateSchema) => state.user.user?.id;
