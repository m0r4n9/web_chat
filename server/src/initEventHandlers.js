import chatService from './services/chat-service.js';
import userService from './services/user-service.js';
import EventMessages from './events/messages.js';

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

    if (!cookies) {
      return next(new Error('Not authorized'));
    }

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
    });
    next();
  });

  io.on('connection', (socket) => {
    console.log('Connection User: ', socket.user);

    socket.on('message:send', async (message) =>
      EventMessages.send(socket, message),
    );
    socket.on('message:typing', async (payload) =>
      EventMessages.typing(socket, payload),
    );

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
