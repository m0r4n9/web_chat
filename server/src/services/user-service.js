const { User, ChatMember } = require('../models');
const ApiError = require('../exceptions/api-error');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

class UserService {
    async getUsers(userId) {
        try {
            const existingChatUserIds = await ChatMember.findAll({
                where: {
                    userId: userId,
                },
                attributes: ['chatId'],
            });

            const existingChatIds = existingChatUserIds.map(
                (chatMember) => chatMember.chatId,
            );

            const usersInExistingChats = await ChatMember.findAll({
                where: {
                    chatId: {
                        [Op.in]: existingChatIds,
                    },
                    userId: {
                        [Op.ne]: userId,
                    },
                },
                attributes: ['userId'],
            });

            const usersInExistingChatIds = usersInExistingChats.map(
                (chatMember) => chatMember.userId,
            );

            return await User.findAll({
                where: {
                    id: {
                        [Op.ne]: userId,
                        [Op.notIn]: usersInExistingChatIds,
                    },
                },
                attributes: ['id', 'username', 'email'],
            });
        } catch (err) {
            throw Error(`Error while fetching Users: ${err}`);
        }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email }, raw: true });
        if (!user) {
            throw ApiError.BadRequest(
                'Пользователь с таким почтовым адрессом не найден',
            );
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        return user;
    }

    async registration(email, password, username) {
        const candidate = await User.findOne({
            where: {
                email,
            },
        });

        if (candidate) {
            throw ApiError.BadRequest(
                'Пользователь с таким почтовым адрессом уже существует',
            );
        }

        const hashPassword = await bcrypt.hash(password, 5);
        return await User.create({
            email,
            password: hashPassword,
            username,
        });
    }

    async refresh(userId) {
        return User.findByPk(userId);
    }
}

module.exports = new UserService();
