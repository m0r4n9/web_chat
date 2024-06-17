export { StoreProvider } from './StoreProvider.tsx';
export type { AppDispatch } from './store.ts';
export type { StateSchema, ThunkConfig } from './StateSchema.ts';

export { contactActions } from './slice/Contacts/contactsSlice.ts';

export { getContacts } from './slice/Contacts/selectors/getContacts.ts';
export { fetchContacts } from './slice/Contacts/services/fetchContacts.ts';
export { getUserId, getUserData } from './slice/User/user-selector.ts';
