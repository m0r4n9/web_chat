const { User, ChatMember } = require('../models');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./token-service');
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

        const tokens = tokenService.generateTokens({ ...user });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return { ...user, ...tokens };
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
        const user = await User.create({
            email,
            password: hashPassword,
            username,
        });
        const userData = user.get({ plain: true });
        const tokens = tokenService.generateTokens({ ...userData });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...userData,
            ...tokens,
        };
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findByPk(userData.id, { raw: true });
        const tokens = tokenService.generateTokens({ ...user });
        await tokenService.saveToken(user.id, tokens.refreshToken);
        return { ...user, ...tokens };
    }
}

module.exports = new UserService();
