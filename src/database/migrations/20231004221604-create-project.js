"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      projectId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      projectName: {
        type: Sequelize.STRING,
      },
      projectOwner: {
        type: Sequelize.STRING,
      },
      projectFile: {
        type: Sequelize.STRING,
      },
      schoolId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Schools",
          key: "schoolId",
          as: "School",
        },
      },
      status: {
        type: Sequelize.ENUM("pending", "rejected", "selected"),
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
    await queryInterface.dropTable("Projects");
  },
};
