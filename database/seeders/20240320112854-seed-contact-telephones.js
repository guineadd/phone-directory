"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "ContactTelephones",
      [
        // * example contact-telephone associations
        // ! contactId and telephoneId must be valid ids from the Contacts and Telephones tables
        { contactId: 1, telephoneId: 1, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 2, telephoneId: 2, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 3, telephoneId: 3, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 4, telephoneId: 4, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 5, telephoneId: 5, createdAt: new Date(), updatedAt: new Date() },
        // add more contact-telephone associations here
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("ContactTelephones", null, {});
  },
};
