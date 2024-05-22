"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "Telephones",
      [
        // * example telephones
        // ! telephones are set to be three-digit numbers starting with 100
        { tel: "100", createdAt: new Date(), updatedAt: new Date() },
        { tel: "101", createdAt: new Date(), updatedAt: new Date() },
        { tel: "102", createdAt: new Date(), updatedAt: new Date() },
        { tel: "103", createdAt: new Date(), updatedAt: new Date() },
        // add more telephones here
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Telephones", null, {});
  },
};
