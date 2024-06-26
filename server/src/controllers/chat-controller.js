const chatService = require('../services/chat-service');
const { User, ChatMember } = require('../models');
const { Op } = require('sequelize');

class ChatController {
    async createChat(req, res, next) {
        const { currentUserId = 1, userId } = req.body;
        try {
            const chatId = await chatService.createChat(currentUserId, userId);
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

            const result = chatUsers.map((chatUser) => {
                const user = userMap[chatUser.userId];
                return {
                    ...user,
                    chatId: chatUser.chatId,
                };
            });

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
            const messages = await chatService.getMessages({
                chatId,
                page,
            });
            return res.json(messages);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ChatController();
