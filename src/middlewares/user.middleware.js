import checkToken from "../helpers/token.helper";
import { decodeToken } from "../helpers/user.helper";
import UserService from "../services/user.service";

export default class UserMiddleware {
  constructor() {
    this.userService = new UserService();
  }

  async userLoginMiddleware(req, res, next) {
    try {
      const { userName } = req.body;

      const user = await this.userService.getUserByName(userName);

      if (!user) {
        return res.status(404).json({ message: `user login failed.` });
      }

      return next();
    } catch (error) {
      return res.status(500).json({
        message: "You are not authorized to perform this action",
        error: error.message,
      });
    }
  }

  async userExistMiddleware(req, res, next) {
    try {
      const { id } = req.params;

      const user = await this.userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: `This user was not found.` });
      }

      return next();
    } catch (error) {
      return res.status(500).json({
        message: "You are not authorized to perform this action",
        error: error.message,
      });
    }
  }

  async checkIsAdmin(req, res, next) {
    try {
      const token = await checkToken(req);
      const { id } = req.params;

      if (!token) {
        return res.status(400).json({
          message: "Please login first",
        });
      }
      const userId = decodeToken(token)?.id;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          message: "This action can only be performed by an admin",
        });
      }
      if (id !== userId) {
        return res.status(404).json({
          message: "You can't update another admin's profile",
        });
      }

      return next();
    } catch (error) {
      return res.status(500).json({
        message: "You are not authorized to perform this action",
        error: error.message,
      });
    }
  }
}
