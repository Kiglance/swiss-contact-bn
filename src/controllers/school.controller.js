import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../helpers/user.helper";
import SchoolService from "../services/school.service";

export default class SchoolController {
  constructor() {
    this.schoolService = new SchoolService();
  }

  async addSchool(req, res) {
    try {
      const { schoolName, district, sector, phone, email, userName, password } =
        req.body;

      const newSchool = await this.schoolService.addSchool({
        schoolName,
        district,
        sector,
        phone,
        email,
        userName,
        password: hashPassword(password),
      });

      return res.status(201).json({
        message: "School created successfully.",
        data: newSchool,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occured while adding a school.",
        error: error.message,
      });
    }
  }

  async getSchools(req, res) {
    try {
      const schools = await this.schoolService.getSchools();
      return res.status(200).json({
        message: "Fetched all schools successfully",
        data: schools,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while fetching schools",
        error: error.message,
      });
    }
  }

  async getOneSchool(req, res) {
    try {
      const { id } = req.params;
      const schools = await this.schoolService.getSchoolByPk(id);
      return res.status(200).json({
        message: "Fetched school successfully",
        data: schools,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while fetching school",
        error: error.message,
      });
    }
  }

  async updateSchool(req, res) {
    try {
      const { id } = req.params;

      const updatedSchool = await this.schoolService.updateSchool(req.body, id);

      return res.status(201).json({
        message: "School updated successfully.",
        data: updatedSchool,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating school",
        error: error.message,
      });
    }
  }

  async changeSchoolProfile(req, res) {
    try {
      const { id } = req.params;
      const school = await this.schoolService.getSchoolByPk(id);

      if (req.file) {
        req.body.picture = `http://localhost:3000/profile/${req.file.filename}`;
      } else {
        req.body.picture = school?.picture;
      }
      await this.schoolService.updateSchool(req.body, id);
      return res.status(200).json({
        message: "school profile changed sucessfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change school profile.",
        error: error.message,
      });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const { id } = req.params;

      const school = await this.schoolService.getSchoolByPk(id);

      const validateOld = comparePassword(oldPassword, school.password);
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
          message: "Passwords don't match",
        });
      }

      await this.schoolService.updateSchool(
        {
          password: hashPassword(newPassword),
        },
        id
      );

      return res.status(200).json({
        message: "School password changed sucessfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to change password.",
        error: error.message,
      });
    }
  }

  async deleteSchool(req, res) {
    try {
      const { id } = req.params;

      await this.schoolService.deleteSchool(id);

      return res.status(200).json({
        message: "School deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while deleting school",
        error: error.message,
      });
    }
  }

  async schoolLogin(req, res) {
    try {
      const { userName, password } = req.body;

      const school = await this.schoolService.getSchoolByUserName(userName);
      const validate = comparePassword(password, school.password);

      if (validate) {
        const token = generateToken({ id: school.schoolId }, "7d");

        return res.status(200).json({
          message: "School login was successful",
          data: { token, id: school?.schoolId, type: "school" },
        });
      } else {
        return res.status(404).json({ message: `School login failed.` });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error: school login failed",
        error: error.message,
      });
    }
  }
}
