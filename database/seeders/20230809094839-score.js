'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("score", [
      {
        userId: 1,
        gameId: 1,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        gameId: 1,
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        gameId: 2,
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("score", null, {});
  }
};
