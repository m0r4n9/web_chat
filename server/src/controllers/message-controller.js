import { Message } from '../models/index.js';

class MessageController {
  async send(message) {
    try {
      await Message.create({
        chatId: message.chatId,
        senderId: message.senderId,
        content: message.content,
        username: message.username,
      });
    } catch (error) {
      console.log('Error send message: ', error);
    }
  }
}

export default new MessageController();
