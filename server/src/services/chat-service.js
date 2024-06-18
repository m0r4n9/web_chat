const { Op } = require('sequelize');
const { Chat, ChatMember } = require('../models');
const ApiError = require('../exceptions/api-error');

class ChatService {
    async createChat(currentUserId, userId) {
        if (!currentUserChatIds || !userId) {
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
}

module.exports = new ChatService();
