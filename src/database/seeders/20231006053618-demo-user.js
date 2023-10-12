"use strict";

const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        userId: "202b2bfa-b290-4030-aba2-e66d153069b9",
        role: "admin",
        firstName: "MANZI",
        lastName: "Valentin",
        email: "valentin@gmail.com",
        userName: "valentin",
        password: await bcrypt.hash("Password123", 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "202b2bfa-b278-4099-aba2-e66d159969c0",
        role: "admin",
        firstName: "RUTAYISIRE",
        lastName: "Gerard",
        email: "gerard@gmail.com",
        userName: "gerard",
        password: await bcrypt.hash("Password123", 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
