"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Schools", {
      schoolId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      schoolName: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
        defaultValue:
          "https://www.pngkit.com/png/detail/17-178229_school-building-icon-school-icon-vector-png.png",
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING,
      },
      sector: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
      },
      userName: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("pending", "revoked", "granted"),
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Schools");
  },
};
