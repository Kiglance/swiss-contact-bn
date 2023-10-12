import checkToken from "../helpers/token.helper";
import { decodeToken } from "../helpers/user.helper";
import ProjectService from "../services/project.service";
import SchoolService from "../services/school.service";
import UserService from "../services/user.service";

export default class ProjectMiddleware {
  constructor() {
    this.schoolService = new SchoolService();
    this.projectService = new ProjectService();
  }

  async projectNameTaken(req, res, next) {
    try {
      const { projectName } = req.body;

      const project = await this.projectService.getProjectByName(projectName);

      if (project) {
        return res.status(409).json({
          message: "This project name was taken",
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

  async checkIsSchoolAction(req, res, next) {
    try {
      const token = await checkToken(req);

      if (!token) {
        return res.status(400).json({
          message: "Please login first (school)",
        });
      }
      const schoolId = decodeToken(token)?.id;
      const school = await this.schoolService.getSchoolByPk(schoolId);

      if (!school) {
        return res.status(404).json({
          message: "This action can only be performed by a school",
        });
      }
      if (school?.Projects?.length >= 10 && req.method === "POST") {
        return res.status(403).json({
          message: "You can't exceed 10 projects",
        });
      }

      req.school = school;

      return next();
    } catch (error) {
      return res.status(500).json({
        message: "You are not authorized to perform this action",
        error: error.message,
      });
    }
  }

  async checkIsOwnerSchool(req, res, next) {
    try {
      const school = req.school;
      const { id } = req.params;

      const project = await this.projectService.getProjectByPk(id);

      if (school?.schoolId !== project?.schoolId) {
        return res.status(409).json({
          message: "You can't edit projects of another school",
        });
      }
      if (project.status !== "pending") {
        return res.status(409).json({
          message: "You can only edit pending projects",
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

  async projectExistMiddleware(req, res, next) {
    try {
      const { id } = req.params;

      const project = await this.projectService.getProjectByPk(id);

      if (!project) {
        return res.status(404).json({ message: `This project was not found.` });
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
