import UserService from '../services/user-service.js';

class UserController {
  async getUsers(req, res, next) {
    const userId = req.params.userId;

    try {
      const users = await UserService.getUsers(userId);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await UserService.login(email, password);
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async registration(req, res, next) {
    const { email, password, username } = req.body;
    try {
      const user = await UserService.registration(email, password, username);
      return res.json({
        id: user.id,
        ...user,
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const user = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
