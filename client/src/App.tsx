import { QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { router } from './main';
import { ProviderProps, Providers } from './providers';

const App = () => {
    const queryClient = new QueryClient();

    const userId = localStorage.getItem('userId');

    const providersProps: Omit<ProviderProps, 'children'> = {
        user: {
            defaultUser: {
                id: '1',
                email: 'test1@test.com',
                username: 'Aleks',
            },
        },
        query: {
            client: queryClient,
        },
    };

    if (userId) {
        const getUserQuery = queryClient.fetchQuery({
            queryKey: ['getUser'],
            queryFn: async () => {
                await new Promise((resolve) => {
                    setTimeout(resolve, 1500);
                });
                return {
                    id: '1',
                    email: 'test1@test.com',
                    username: 'Aleks',
                };
            },
        });

        providersProps.user.defaultUser = getUserQuery;
    }

    return (
        <Providers {...providersProps}>
            <RouterProvider router={router} />
        </Providers>
    );
};

export default App;
