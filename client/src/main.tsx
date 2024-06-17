import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SidenavLayout } from '@/layouts/SidenavLayout';
import { LoginPage } from './pages/LoginPage';
import { StoreProvider } from './store';
import { ChatPage } from '@/pages/ChatPage';

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
