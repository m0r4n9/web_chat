const Router = require('express');

const userController = require('../controllers/user-controller');
const chatController = require('../controllers/chat-controller');

const router = new Router();

router.get('/users/:userId', userController.getUsers);

router.post('/chat', chatController.createChat);
router.get('/chat/:userId', chatController.getChatUsers);
router.get('/messages/:chatId', chatController.getMessages);
router.get('/chat/members/:chatId', chatController.getChatMembers);

router.post('/login', userController.login);
router.post('/register', userController.registration);
router.get('/refresh', userController.refresh);

module.exports = router;
