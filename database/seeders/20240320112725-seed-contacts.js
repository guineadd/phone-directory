"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const contactsSeedData = [
      // * example contacts
      // ! associations with the departmentId field begin with 2 because the first valid department has an id of 2
      {
        departmentId: 2,
        firstName: "John",
        lastName: "Doe",
        comment: "This is an example contact",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        departmentId: 2,
        firstName: "Nick",
        lastName: "Cave",
        comment: "This is an example contact",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        departmentId: 3,
        firstName: "Jane",
        lastName: "Doe",
        comment: "This is an example contact",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // add more contacts here
    ];

    // Bulk insert into Contacts table
    return queryInterface.bulkInsert("Contacts", contactsSeedData, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Contacts", null, {});
  },
};
