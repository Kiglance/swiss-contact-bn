"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.School, {
        foreignKey: {
          name: "schoolId",
          allowNull: true,
        },
        onDelete: "CASCADE",
        as: "School",
      });
    }
  }
  Project.init(
    {
      projectId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      projectName: {
        type: DataTypes.STRING,
      },
      projectOwner: {
        type: DataTypes.STRING,
      },
      projectFile: {
        type: DataTypes.STRING,
      },
      schoolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "rejected", "selected"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
