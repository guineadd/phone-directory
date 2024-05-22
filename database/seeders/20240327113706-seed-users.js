"use strict";

const argon2 = require("argon2");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [
      // * preset users
      // ! the first user is the admin user and should automatically be seeded into the database
      // ! the password is hashed using argon2
      // ! it is recommended to create a new user and delete this one after deployment
      // ! the admin user is granted all permissions within the app's logic
      { userTypeId: 1, username: "admin", password: "admin" },
      // add more users here
    ];

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
