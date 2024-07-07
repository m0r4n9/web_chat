import { Message } from './models/index.js';
import chatService from './services/chat-service.js';
import userService from './services/user-service.js';

export function initEventHandlers({ io }) {
  io.use(async (socket, next) => {
    const cookies = socket.request.headers.cookie;

    const parseCookies = (cookies) => {
      return cookies.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=').map((c) => c.trim());
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
    };

    const parsedCookies = parseCookies(cookies);
    const refreshToken = parsedCookies['refreshToken'];

    try {
      const user = userService.getUserByToken(refreshToken);
      socket.user = user;
    } catch (error) {
      console.log('Error when fetch User, Socket: ', error);
      next(error);
    }

    let chats;

    try {
      chats = await chatService.getUserChats(socket.user.id);
    } catch (error) {
      return next(error);
    }
    chats.forEach((chatId) => {
        socket.join(`chat:${chatId}`);
    })
    console.log('Chats: ', chats);
    next();
  });

  io.on('connection', (socket) => {
    console.log('Connection User: ', socket.user);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message:send', async (msg) => {
      try {
        const message = await Message.create({
          chatId: msg.chatId,
          senderId: msg.senderId,
          content: msg.content,
          username: msg.username,
        });
        socket.emit('message:sent', message);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('foo', (data) => {
      console.log('foo event received:', data);
      io.emit('foo', data);
    });
  });
}
