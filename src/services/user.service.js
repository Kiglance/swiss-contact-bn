import { User } from "../database/models";

export default class UserService {
  async createUser(data) {
    return await User.create(data);
  }

  async getUsers() {
    return await User.findAll();
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async updateUser(data, id) {
    return await User.update(data, {
      where: {
        userId: id,
      },
    });
  }

  async getUserByName(userName) {
    return await User.findOne({
      where: { userName },
    });
  }
}
