import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../helpers/user.helper";
import UserService from "../services/user.service";
import "dotenv/config";

const url = process.env.BACKEND_URL;

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req, res) {
    try {
      const { firstName, lastName, email, userName, password } = req.body;

      const newUser = await this.userService.createUser({
        firstName,
        lastName,
        email,
        userName,
        password: hashPassword(password),
      });

      return res.status(201).json({
        message: "User created successfully.",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occured while adding a user.",
        error: error.message,
      });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json({
        message: "Users fetched successfully.",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occured while fetching users.",
        error: error.message,
      });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      return res.status(200).json({
        message: "User fetched successfully.",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occured while fetching a user.",
        error: error.message,
      });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const { id } = req.params;

      const user = await this.userService.getUserById(id);

      const validateOld = comparePassword(oldPassword, user.password);
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({
          message: "Please fill out the required fields",
        });
      }
      if (!validateOld) {
        return res.status(400).json({
          message: "Incorrect old password",
        });
      }
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          message: "Password don't match",
        });
      }

      await this.userService.updateUser(
        {
          password: hashPassword(newPassword),
        },
        id
      );

      return res.status(200).json({
        message: "Password changed sucessfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change password.",
        error: error.message,
      });
    }
  }

  async changeUserProfile(req, res) {
    try {
      const { id } = req.params;

      if (req.file) {
        req.body.picture = `${url}/profile/${req.file.filename}`;
      }

      await this.userService.updateUser({ picture: req.body.picture }, id);
      return res.status(200).json({
        message: "User profile changed sucessfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change user profile.",
        error: error.message,
      });
    }
  }

  async changeUserName(req, res) {
    try {
      const { userName } = req.body;
      const { id } = req.params;

      await this.userService.updateUser({ userName }, id);
      return res.status(200).json({
        message: "User name changed sucessfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change user name.",
        error: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { userName, firstName, lastName, email } = req.body;
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (req.file) {
        req.body.picture = `${url}/profile/${req.file.filename}`;
      } else {
        req.body.picture = user?.picture;
      }

      await this.userService.updateUser(
        {
          userName,
          firstName,
          lastName,
          email,
          picture: req.body.picture,
        },
        id
      );
      return res.status(200).json({
        message: "User updated sucessfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change user.",
        error: error.message,
      });
    }
  }

  async userLogin(req, res) {
    try {
      const { userName, password } = req.body;

      const user = await this.userService.getUserByName(userName);
      const validate = comparePassword(password, user.password);

      if (!validate) {
        return res.status(404).json({ message: `user login failed.` });
      }
      const token = generateToken({ id: user.userId }, "7d");
      return res.status(200).json({
        message: "user login was successful",
        data: { token, id: user?.userId, type: "user" },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error: user login failed",
        error: error.message,
      });
    }
  }
}
