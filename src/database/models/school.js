"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    static associate(models) {
      this.hasMany(models.Project, {
        foreignKey: "schoolId",
        onDelete: "CASCADE",
        as: "Projects",
      });
    }
  }
  School.init(
    {
      schoolId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      schoolName: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue:
          "https://www.pngkit.com/png/detail/17-178229_school-building-icon-school-icon-vector-png.png",
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING,
      },
      sector: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      userName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("pending", "revoked", "granted"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "School",
    }
  );
  return School;
};
