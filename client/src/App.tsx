import { QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { router } from './main';
import { ProviderProps, Providers } from './providers';

const App = () => {
    const queryClient = new QueryClient();

    const providersProps: Omit<ProviderProps, 'children'> = {
        query: {
            client: queryClient,
        },
    };

    return (
        <Providers {...providersProps}>
            <RouterProvider router={router} />
        </Providers>
    );
};

export default App;
