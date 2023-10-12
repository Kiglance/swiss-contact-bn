import checkToken from "../helpers/token.helper";
import { decodeToken } from "../helpers/user.helper";
import SchoolService from "../services/school.service";
import UserService from "../services/user.service";

export default class SchoolMiddleware {
  constructor() {
    this.schoolService = new SchoolService();
    this.userService = new UserService();
  }

  async schoolNameTakenMiddleware(req, res, next) {
    try {
      const { schoolName, userName, email } = req.body;

      const schoolBySchoolName = await this.schoolService.getSchoolBySchoolName(
        schoolName
      );
      const schoolByUserName = await this.schoolService.getSchoolByUserName(
        userName
      );
      const schoolByEmail = await this.schoolService.getSchoolByEmail(email);

      if (schoolBySchoolName) {
        return res.status(400).json({
          message: "This school name was taken",
        });
      }
      if (schoolByUserName) {
        return res.status(400).json({
          message: "This user name was taken",
        });
      }
      if (schoolByEmail) {
        return res.status(400).json({
          message: "This user email was taken",
        });
      }

      return next();
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "You are not authorized to perform this action",
          error: error.message,
        });
    }
  }

  async schoolLoginMiddleware(req, res, next) {
    try {
      const { userName } = req.body;

      const school = await this.schoolService.getSchoolByUserName(userName);

      if (!school) {
        return res.status(404).json({ message: `School login failed.` });
      }

      return next();
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "You are not authorized to perform this action",
          error: error.message,
        });
    }
  }

  async schoolExistMiddleware(req, res, next) {
    try {
      const { id } = req.params;

      const school = await this.schoolService.getSchoolByPk(id);

      if (!school) {
        return res.status(404).json({ message: `This school was not found.` });
      }

      return next();
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "You are not authorized to perform this action",
          error: error.message,
        });
    }
  }

  async checkIsAdmin(req, res, next) {
    try {
      const token = await checkToken(req);

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

      return next();
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "You are not authorized to perform this action",
          error: error.message,
        });
    }
  }
}
