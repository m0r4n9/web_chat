import './index.css';
import './App.css';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SidenavLayout } from '@/layouts/SidenavLayout';
import { ChatPage } from '@/pages/ChatPage';

import { LoginPage } from './pages/LoginPage';
import { StoreProvider } from './store';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        element: <SidenavLayout />,
        children: [
            {
                path: '/',
                element: <ChatPage />,
            },
            {
                path: '/:chatId',
                element: <ChatPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <RouterProvider router={router} />
    </StoreProvider>,
);
