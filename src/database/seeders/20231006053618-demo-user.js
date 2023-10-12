"use strict";

const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        userId: "202b2bfa-b290-4030-aba2-e66d153069b9",
        role: "admin",
        firstName: "Admin",
        lastName: "One",
        email: "admin1@sc.com",
        userName: "one",
        password: await bcrypt.hash("Password@123", 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "202b2bfa-b278-4099-aba2-e66d159969c0",
        role: "admin",
        firstName: "Admin",
        lastName: "Two",
        email: "admin2@sc.com",
        userName: "two",
        password: await bcrypt.hash("Password@123", 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
