import { Project, School } from "../database/models";
export default class ProjectService {
  async addProject(data) {
    return await Project.create(data);
  }

  async getProjects(where) {
    return await Project.findAll(where);
  }

  async getProjectByPk(id) {
    return await Project.findByPk(id);
  }

  async getProjectByName(projectName) {
    return await Project.findOne({
      where: { projectName },
    });
  }

  async updateProject(data, id) {
    return await Project.update(data, {
      where: {
        projectId: id,
      },
    });
  }

  async deleteProject(id) {
    return await Project.destroy({
      where: {
        projectId: id,
      },
    });
  }

  async deleteAllProjects() {
    return await Project.destroy();
  }
}
