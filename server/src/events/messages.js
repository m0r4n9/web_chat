import { ajv, chatRoom } from '../utils.js';
import { ChatMember, Message } from '../models/index.js';

const validateMessage = ajv.compile({
  type: 'object',
  properties: {
    chatId: { type: 'number' },
    content: { type: 'string', minLength: 1, maxLength: 1000 },
    senderId: { type: 'number' },
  },
  required: ['chatId', 'content'],
  additionalProperties: false,
});

const validatePayloadTyping = ajv.compile({
  type: 'object',
  properties: {
    channelId: { type: 'number' },
    isTyping: { type: 'boolean' },
  },
  required: ['channelId', 'isTyping'],
  additionalProperties: false,
});

class EventMessage {
  async send(socket, message) {
    if (!validateMessage(message)) {
      return;
    }

    try {
      const dataMessage = await Message.create(
        {
          chatId: message.chatId,
          senderId: socket.user.id,
          content: message.content,
        },
        { raw: true },
      );
      socket.to(chatRoom(message.chatId)).emit('message:sent', dataMessage);
    } catch (error) {
      console.log('Error when send message: ', error);
    }
  }

  async typing(socket, payload) {
    console.log('Message:typing: ', payload);
    if (validatePayloadTyping(payload)) {
      return;
    }

    const userInChat = await ChatMember.findOne({
      where: {
        chatId: payload.chatId,
        userId: socket.user.id,
      },
      raw: true,
    });

    if (!userInChat) {
      return;
    }

    socket.to(chatRoom(socket.user.id)).emit('message:typing', {
      userId: socket.user.id,
      chatId: payload.chatId,
      isTyping: payload.isTyping,
    });
  }
}

export default new EventMessage();
