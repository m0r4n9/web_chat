import { ChatMember, Message, User } from '../models/index.js';
import { Op } from 'sequelize';

class EventChat {
  async list(socket, callback) {
    const chats = await ChatMember.findAll({
      where: {
        userId: socket.user.id,
      },
      attributes: ['chatId'],
      raw: true,
    });

    const chatsId = chats.map((chat) => chat.chatId);

    const chatUsers = await ChatMember.findAll({
      where: {
        chatId: {
          [Op.in]: chatsId,
        },
        userId: {
          [Op.ne]: socket.user.id,
        },
      },
      attributes: ['userId', 'chatId'],
    });

    const usersId = chatUsers.map((user) => user.userId);

    const users = await User.findAll({
      attributes: ['id', 'username', 'isOnline'],
      raw: true,
      where: {
        id: {
          [Op.in]: usersId,
        },
      },
    });


    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user;
    });

    const result = [];
    for (let i = 0; i < chatUsers.length; i++) {
      const user = userMap[chatUsers[i].userId];
      const message = await Message.findOne({
        where: {
          chatId: chatUsers[i].chatId,
        },
        limit: 1,
        order: [['messageId', 'DESC']],
        raw: true,
      });

      if (!message) continue;

      result.push({
        ...user,
        message: message.content,
        chatId: chatUsers[i].chatId,
      });
    }
    callback(result);
  }

  async join() {

  }
}

export default new EventChat();
