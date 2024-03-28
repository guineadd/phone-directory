"use strict";

const argon2 = require("argon2");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [{ userTypeId: 1, username: "akalogeras", password: "admin" }];

    await Promise.all(
      users.map(async user => {
        user.password = await argon2.hash(user.password);
      }),
    );

    return queryInterface.bulkInsert(
      "Users",
      users.map(user => ({ ...user, createdAt: new Date(), updatedAt: new Date() })),
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
