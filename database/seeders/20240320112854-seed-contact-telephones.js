"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "ContactTelephones",
      [
        { contactId: 1, telephoneId: 1, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 2, telephoneId: 2, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 3, telephoneId: 3, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 4, telephoneId: 4, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 5, telephoneId: 5, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 6, telephoneId: 6, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 7, telephoneId: 7, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 8, telephoneId: 8, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 9, telephoneId: 9, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 10, telephoneId: 10, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 11, telephoneId: 11, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 12, telephoneId: 12, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 12, telephoneId: 13, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 13, telephoneId: 14, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 14, telephoneId: 15, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 15, telephoneId: 16, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 16, telephoneId: 17, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 17, telephoneId: 18, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 18, telephoneId: 19, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 19, telephoneId: 20, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 20, telephoneId: 21, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 21, telephoneId: 21, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 22, telephoneId: 22, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 23, telephoneId: 23, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 24, telephoneId: 24, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 25, telephoneId: 25, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 26, telephoneId: 26, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 27, telephoneId: 27, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 28, telephoneId: 27, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 29, telephoneId: 28, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 30, telephoneId: 29, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 31, telephoneId: 30, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 32, telephoneId: 31, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 33, telephoneId: 32, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 34, telephoneId: 33, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 35, telephoneId: 34, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 36, telephoneId: 35, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 37, telephoneId: 36, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 38, telephoneId: 37, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 39, telephoneId: 38, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 40, telephoneId: 39, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 41, telephoneId: 40, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 42, telephoneId: 41, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 43, telephoneId: 42, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 44, telephoneId: 43, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 45, telephoneId: 44, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 46, telephoneId: 45, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 47, telephoneId: 46, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 48, telephoneId: 47, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 49, telephoneId: 48, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 50, telephoneId: 49, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 51, telephoneId: 50, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 52, telephoneId: 51, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 53, telephoneId: 52, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 54, telephoneId: 53, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 55, telephoneId: 54, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 56, telephoneId: 55, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 57, telephoneId: 56, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 58, telephoneId: 57, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 59, telephoneId: 58, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 60, telephoneId: 59, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 61, telephoneId: 60, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 62, telephoneId: 61, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 63, telephoneId: 62, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 64, telephoneId: 63, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 64, telephoneId: 64, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 65, telephoneId: 65, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 66, telephoneId: 66, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 67, telephoneId: 67, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 68, telephoneId: 68, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 69, telephoneId: 69, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 70, telephoneId: 70, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 71, telephoneId: 71, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 72, telephoneId: 72, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 72, telephoneId: 73, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 73, telephoneId: 74, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 74, telephoneId: 75, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 75, telephoneId: 76, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 76, telephoneId: 77, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 77, telephoneId: 78, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 78, telephoneId: 79, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 79, telephoneId: 80, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 80, telephoneId: 81, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 81, telephoneId: 82, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 82, telephoneId: 83, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 83, telephoneId: 84, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 84, telephoneId: 85, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 85, telephoneId: 86, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 86, telephoneId: 87, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 87, telephoneId: 88, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 88, telephoneId: 89, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 89, telephoneId: 90, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 90, telephoneId: 91, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 91, telephoneId: 92, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 92, telephoneId: 93, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 93, telephoneId: 94, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 94, telephoneId: 95, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 95, telephoneId: 96, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 96, telephoneId: 96, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 97, telephoneId: 97, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 98, telephoneId: 98, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 98, telephoneId: 99, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 99, telephoneId: 100, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 100, telephoneId: 101, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 101, telephoneId: 102, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 102, telephoneId: 103, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 103, telephoneId: 104, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 104, telephoneId: 105, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 105, telephoneId: 106, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 106, telephoneId: 107, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 107, telephoneId: 108, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 108, telephoneId: 109, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 109, telephoneId: 110, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 110, telephoneId: 111, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 111, telephoneId: 112, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 112, telephoneId: 113, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 113, telephoneId: 114, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 114, telephoneId: 115, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 115, telephoneId: 116, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 116, telephoneId: 117, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 117, telephoneId: 118, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 118, telephoneId: 119, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 119, telephoneId: 120, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 120, telephoneId: 121, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 120, telephoneId: 122, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 121, telephoneId: 123, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 122, telephoneId: 124, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 123, telephoneId: 125, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 124, telephoneId: 126, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 125, telephoneId: 127, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 126, telephoneId: 128, createdAt: new Date(), updatedAt: new Date() },
        { contactId: 127, telephoneId: 129, createdAt: new Date(), updatedAt: new Date() },
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("ContactTelephones", null, {});
  },
};
