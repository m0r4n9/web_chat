import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createReduxStore } from './store.ts';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const store = createReduxStore();
    return <Provider store={store}>{children}</Provider>;
};
