const Router = require('express');

const userController = require('../controllers/user-controller');
const chatController = require('../controllers/chat-controller');

const router = new Router();

router.get('/users/:userId', userController.getUsers);
router.get('/user/refresh/:userId', userController.refresh);

router.post('/chat', chatController.createChat);
router.get('/chat/:userId', chatController.getChatUsers);
router.get('/messages/:chatId', chatController.getChatData);

router.post('/login', userController.login);
router.post('/register', userController.registration);

module.exports = router;
