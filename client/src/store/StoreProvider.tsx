import { Provider } from 'react-redux';
import { createReduxStore } from './store.ts';
import { ReactNode } from 'react';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const store = createReduxStore();
    return <Provider store={store}>{children}</Provider>;
};
