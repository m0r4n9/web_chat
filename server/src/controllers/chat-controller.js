import ChatService from '../services/chat-service.js';
import { User, ChatMember, Message } from '../models/index.js';
import { Op } from 'sequelize';

class ChatController {
  async createChat(req, res, next) {
    const { currentUserId = 1, userId } = req.body;
    try {
      const chatId = await ChatService.createChat(currentUserId, userId);
      return res.json(chatId);
    } catch (error) {
      next(error);
    }
  }

  async getChatUsers(req, res) {
    const userId = req.params.userId;

    if (isNaN(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    try {
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

        console.log('Message: ', message);

        result.push({
          ...user,
          message: message.content,
          chatId: chatUsers[i].chatId,
        });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  async getMessages(req, res, next) {
    const chatId = req.params.chatId;
    const { page = 1 } = req.query;

    try {
      const messages = await ChatService.getMessages({
        chatId,
        page,
      });
      return res.json(messages);
    } catch (error) {
      next(error);
    }
  }

  async getChatMembers(req, res, next) {
    const chatId = req.params.chatId;
    try {
      const members = await ChatService.getChatMembers(chatId);
      return res.json(members);
    } catch (error) {
      next(error);
    }
  }

  async getUserChats(req, res, next) {
    const userId = req.params.userId;
    try {
      const chats = await ChatService.getUserChats(userId);
      return res.json(chats);
    } catch (error) {
      next(error);
    }
  }
}

export default new ChatController();
