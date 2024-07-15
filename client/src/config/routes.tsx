import { createBrowserRouter } from 'react-router-dom';

import { SidenavLayout } from '@/layouts/SidenavLayout';
import { AuthPage } from '@/pages/AuthPage';
import { ChatPage } from '@/pages/ChatPage';
import { StartPage } from '@/pages/StartPage';

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
