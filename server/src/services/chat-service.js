const { Op } = require('sequelize');
const { Chat, ChatMember, Message } = require('../models');
const ApiError = require('../exceptions/api-error');

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

    async getMessages({ chatId, page = 1 }) {
        const limit = 15;
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

        console.log('Total Page: ', totalPages);

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

    async getChatMembers(chatId) {
        const members = await ChatMember.findAll({
            where: {
                chatId,
            },
            attributes: ['userId'],
            raw: true
        });
        return members;
    }
}

module.exports = new ChatService();
