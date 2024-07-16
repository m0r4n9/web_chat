import { Op } from 'sequelize';
import { Chat, ChatMember, Message, User } from '../models/index.js';
import ApiError from '../exceptions/api-error.js';
import TokenService from './token-service.js';

class ChatService {
  async createChat(currentUserId, userId) {
    if (!currentUserId || !userId) {
      throw new ApiError.BadRequest('Данные неполные');
    }

    const currentUserChats = await ChatMember.findAll({
      where: {
        userId: currentUserId,
      },
      attributes: ['chatId'],
    });

    const currentUserChatIds = currentUserChats.map(
      (chatMember) => chatMember.chatId,
    );

    const existingChat = await ChatMember.findOne({
      where: {
        chatId: {
          [Op.in]: currentUserChatIds,
        },
        userId: userId,
      },
      attributes: ['chatId'],
    });

    if (existingChat) {
      return existingChat.chatId;
    }

    const newChat = await Chat.create({
      chatName: `${currentUserId}-${userId}`,
      chatType: 'private',
    });

    const chatData = newChat.dataValues;

    await ChatMember.create({
      chatId: chatData.chatId,
      userId: currentUserId,
    });

    await ChatMember.create({
      chatId: chatData.chatId,
      userId: userId,
    });

    return chatData.chatId;
  }

  async getUserContacts(userId) {
    const chats = await ChatMember.findAll({
      where: {
        userId,
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
          [Op.ne]: userId,
        },
      },
      attributes: ['userId', 'chatId'],
    });

    const usersId = chatUsers.map((user) => user.userId);

    const users = await User.findAll({
      attributes: ['id', 'username'],
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

    return result;
  }

  async getMessages({ chatId, page = 1 }) {
    const limit = 30;
    const offset = (parseInt(page) - 1) * limit;

    const chat = await Chat.findByPk(chatId);

    if (!chat) {
      throw ApiError.BadRequest('Чат не найден');
    }

    const totalMessages = await Message.count({
      where: {
        chatId,
      },
    });
    const totalPages = Math.ceil(totalMessages / limit);

    const messages = await Message.findAll({
      limit,
      offset,
      where: {
        chatId,
      },
      order: [['messageId', 'DESC']],
    });

    return {
      data: messages.reverse(),
      nextCursor: ++page,
      isLastPage: page > totalPages,
    };
  }

  async getChatData(chatId, refreshToken) {
    const user = TokenService.validateRefreshToken(refreshToken);

    const members = await ChatMember.findAll({
      where: {
        chatId,
        userId: user.id,
      },
      attributes: ['userId'],
      raw: true,
    });

    const access = !!members.length;

    if (!access)
      return {
        access: false,
      };

    console.log(user);

    const member = await ChatMember.findOne({
      where: {
        chatId,
        userId: {
          [Op.ne]: user.id,
        },
      },
      attributes: ['userId'],
      raw: true
    });

    const interlocutor = await User.findByPk(member.userId, {
      attributes: ['username'],
      raw: true,
    });

    return {
      access: true,
      interlocutor,
    };
  }

  async getUserChats(userId) {
    const members = await ChatMember.findAll({
      where: {
        userId,
      },
      raw: true,
    });

    const chatIds = members.map((member) => member.chatId);
    return chatIds;
  }
}

export default new ChatService();
