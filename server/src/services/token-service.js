import jwt from 'jsonwebtoken';
import { Token } from '../models/index.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({
      where: {
        UserId: userId,
      },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await Token.create({
      UserId: userId,
      refreshToken: refreshToken,
    });

    return token;
  }

  async removeToken(refreshToken) {
    return await Token.destroy({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({
      where: { refreshToken: refreshToken },
    });
    return token?.dataValues?.refreshToken;
  }
}

export default new TokenService();
