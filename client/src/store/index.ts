export { contactActions } from './slice/Contacts/contactsSlice.ts';
export { getContacts } from './slice/Contacts/selectors/getContacts.ts';
export { fetchContacts } from './slice/Contacts/services/fetchContacts.ts';
export {
    getAuthError,
    getUserData,
    getUserId,
} from './slice/User/user-selector.ts';
export type { StateSchema, ThunkConfig } from './StateSchema.ts';
export type { AppDispatch } from './store.ts';
export { StoreProvider } from './StoreProvider.tsx';
