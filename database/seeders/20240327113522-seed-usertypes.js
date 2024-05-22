"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "UserTypes",
      [
        // * preset user types
        // ! if the user types change, update the app's logic accordingly
        { type: "admin", createdAt: new Date(), updatedAt: new Date() },
        { type: "editor", createdAt: new Date(), updatedAt: new Date() },
        // add more user types here, remembering to update the app's logic accordingly
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("UserTypes", null, {});
  },
};
