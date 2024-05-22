"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "Departments",
      [
        // * example departments
        // ! departments with order -1 will be displayed last and cannot be reordered
        // ! departments with order 1 will be displayed first and cannot be reordered
        // ! departments with order greater than 1 will be displayed in ascending order and can be reordered
        { name: "Department 1", order: -1, createdAt: new Date(), updatedAt: new Date() },
        { name: "Department 2", order: 1, createdAt: new Date(), updatedAt: new Date() },
        { name: "Department 3", order: 2, createdAt: new Date(), updatedAt: new Date() },
        { name: "Department 4", order: 3, createdAt: new Date(), updatedAt: new Date() },
        { name: "Department 5", order: 4, createdAt: new Date(), updatedAt: new Date() },
        // add more departments here
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Departments", null, {});
  },
};
