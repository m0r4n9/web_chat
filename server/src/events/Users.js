import { User } from '../models/index.js';

class EventUsers {
  async getUser(userId, callback) {
    if (typeof callback !== 'function') return;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (user) {
      callback(user);
    }
  }
}

export default new EventUsers();
