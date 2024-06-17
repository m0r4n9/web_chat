import { StateSchema } from '@/store';

export const getContacts = (state: StateSchema) => state.contacts.contacts;
