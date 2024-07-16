import ChatService from '../services/chat-service.js';

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

  async getUserContacts(req, res) {
    const userId = req.params.userId;

    if (isNaN(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    try {
      const contacts = await ChatService.getUserContacts(userId);
      return res.json(contacts);
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

  async getChatData(req, res, next) {
    const chatId = req.params.chatId;
    const { refreshToken } = req.cookies;

    try {
      const members = await ChatService.getChatData(chatId, refreshToken);
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
