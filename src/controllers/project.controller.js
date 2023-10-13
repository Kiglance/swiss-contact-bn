import { School } from "../database/models";
import ProjectService from "../services/project.service";
import "dotenv/config";

const url = process.env.BACKEND_URL;

export default class ProjectController {
  constructor() {
    this.projectService = new ProjectService();
  }

  async addProject(req, res) {
    try {
      const { projectName, projectOwner } = req.body;
      if (req.file) {
        req.body.projectFile = `${url}/profile/${req.file.filename}`;
      }

      const newProject = await this.projectService.addProject({
        projectName,
        projectOwner,
        schoolId: req.school.schoolId,
        projectFile: req.body.projectFile,
      });

      return res.status(201).json({
        message: "Project created successfully.",
        data: newProject,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occured while adding a project.",
        error: error.message,
      });
    }
  }

  async getSchoolProjects(req, res) {
    try {
      const school = req.school;
      const projects = await this.projectService.getProjects({
        where: { schoolId: school?.schoolId },
        include: [
          {
            model: School,
            as: "School",
          },
        ],
      });
      return res.status(200).json({
        message: "Fetched all school projects successfully",
        data: projects,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while fetching projects",
        error: error.message,
      });
    }
  }

  async getSchoolProjectsById(req, res) {
    try {
      const { id } = req.params;
      const projects = await this.projectService.getProjects({
        where: { schoolId: id },
        include: [
          {
            model: School,
            as: "School",
          },
        ],
      });
      return res.status(200).json({
        message: "Fetched all school projects successfully",
        data: projects,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while fetching projects",
        error: error.message,
      });
    }
  }

  async getProjects(req, res) {
    try {
      const projects = await this.projectService.getProjects({
        include: [
          {
            model: School,
            as: "School",
          },
        ],
      });
      return res.status(200).json({
        message: "Fetched all projects successfully",
        data: projects,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while fetching projects",
        error: error.message,
      });
    }
  }

  async getOneProject(req, res) {
    try {
      const { id } = req.params;

      const project = await this.projectService.getProjectByPk(id);
      return res.status(200).json({
        message: "Fetched project successfully",
        data: project,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while fetching project",
        error: error.message,
      });
    }
  }

  async changeProjectStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await this.projectService.updateProject({ status }, id);
      return res.status(200).json({
        message: "project status updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while changing project status",
        error: error.message,
      });
    }
  }

  async updateProjectData(req, res) {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectByPk(id);

      if (req.file) {
        req.body.projectFile = `${url}/profile/${req.file.filename}`;
      } else {
        req.body.projectFile = project?.projectFile;
      }

      await this.projectService.updateProject(req.body, id);
      return res.status(200).json({
        message: "project updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating project",
        error: error.message,
      });
    }
  }

  async deleteProject(req, res) {
    try {
      const { id } = req.params;

      await this.projectService.deleteProject(id);

      return res.status(200).json({
        message: "project deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while deleting project",
        error: error.message,
      });
    }
  }

  async deleteAllProjects(req, res) {
    try {
      await this.projectService.deleteAllProjects();

      return res.status(200).json({
        message: "projects deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while deleting projects",
        error: error.message,
      });
    }
  }
}
