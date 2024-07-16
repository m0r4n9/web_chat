import Router from 'express';

import UserController from '../controllers/user-controller.js';
import ChatController from '../controllers/chat-controller.js';

export const router = new Router();

router.get('/users/:userId', UserController.getUsers);

router.post('/chat', ChatController.createChat);
router.get('/chat/:userId', ChatController.getUserContacts);
router.get('/messages/:chatId', ChatController.getMessages);
router.get('/chat/:chatId/check-access', ChatController.getChatData);
router.get('/chats/:userId', ChatController.getUserChats);

router.post('/login', UserController.login);
router.post('/register', UserController.registration);
router.get('/refresh', UserController.refresh);
