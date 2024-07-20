import chatService from './services/chat-service.js';
import userService from './services/user-service.js';
import EventMessages from './events/messages.js';
import EventChat from './events/Chat.js';
import EventUsers from './events/Users.js';
import { ChatMember, User } from './models/index.js';
import { chatRoom, userRoom } from './utils.js';

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

  io.on('connection', async (socket) => {
    // Chats
    socket.on('chat:list', async (callback) =>
      EventChat.list(socket, callback),
    );
    socket.on('chat:join', async () => EventChat.join());


    // Users
    socket.on('users:get', async (userId, callback) =>
      EventUsers.getUser(userId, callback),
    );

    // Messages
    socket.on('message:send', async (message) =>
      EventMessages.send(socket, message),
    );
    socket.on('message:typing', async (payload) =>
      EventMessages.typing(socket, payload),
    );

    socket.on('disconnect', async () => {
      setTimeout(async () => {
        const sockets = await io.in(userRoom(socket.user.id)).fetchSockets();
        const hasReconnected = sockets.length > 0;

        console.log(sockets);
        console.log(hasReconnected);

        if (!hasReconnected) {
          const user = await User.findByPk(socket.user.id);
          await user.update({
            isOnline: false,
          });

          console.log('disconnected');

          io.emit('user:disconnected', socket.user.id);
        }
      }, 10000);

      const chats = await ChatMember.findAll({
        where: {
          userId: socket.user.id,
        },
        raw: true,
      });

      chats.forEach(({ chatId }) => {
        io.to(chatRoom(socket.user.id)).emit('message:typing', {
          userId: socket.user.id,
          chatId,
          isTyping: false,
        });
      });
    });

    const user = await User.findByPk(socket.user.id);

    if (user) {
      const wasOnline = user.dataValues.idOnline;

      if (!wasOnline) {
        await user.update({
          isOnline: true,
        });
      }
    }
  });
}
