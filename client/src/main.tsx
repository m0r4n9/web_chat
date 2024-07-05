import './index.css';
import './App.css';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';

import { SidenavLayout } from '@/layouts/SidenavLayout';
import { ChatPage } from '@/pages/ChatPage';
import { StartPage } from '@/pages/StartPage';

import App from './App';
import { AuthPage } from './pages/AuthPage';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <AuthPage />,
    },
    {
        element: <SidenavLayout />,
        children: [
            {
                path: '/',
                element: <StartPage />,
            },
            {
                path: '/chat/:chatId',
                element: <ChatPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
