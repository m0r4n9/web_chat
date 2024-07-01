const userService = require('../services/user-service');

class UserController {
    async getUsers(req, res, next) {
        const userId = req.params.userId;

        try {
            const users = await userService.getUsers(userId);
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const user = await userService.login(
                req.body.email,
                req.body.password,
            );
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async registration(req, res, next) {
        const { email, password, username } = req.body;
        try {
            const user = await userService.registration(
                email,
                password,
                username,
            );
            return res.json({
                id: user.id,
                ...user,
            });
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        const { userId } = req.params;

        try {
            const user = await userService.refresh(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
