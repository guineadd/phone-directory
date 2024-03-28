"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "UserTypes",
      [
        { type: "admin", createdAt: new Date(), updatedAt: new Date() },
        { type: "editor", createdAt: new Date(), updatedAt: new Date() },
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("UserTypes", null, {});
  },
};
