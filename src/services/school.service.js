import { School, Project } from "../database/models";

export default class SchoolService {
  async addSchool(data) {
    return await School.create(data);
  }

  async getSchools() {
    return await School.findAll({});
  }

  async getSchoolByPk(id) {
    return await School.findByPk(id, {
      include: [
        {
          model: Project,
          as: "Projects",
        },
      ],
    });
  }

  async updateSchool(data, id) {
    return await School.update(data, {
      where: {
        schoolId: id,
      },
    });
  }

  async deleteSchool(id) {
    return await School.destroy({
      where: {
        schoolId: id,
      },
    });
  }

  async getSchoolByUserName(userName) {
    return await School.findOne({
      where: { userName },
    });
  }

  async getSchoolBySchoolName(schoolName) {
    return await School.findOne({
      where: { schoolName },
    });
  }

  async getSchoolByEmail(email) {
    return await School.findOne({
      where: { email },
    });
  }
}
