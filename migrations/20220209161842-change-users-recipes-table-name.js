'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {sequelize} = queryInterface
    await sequelize.query(
      `ALTER TABLE usersRecipes
       RENAME TO users_recipes`,
      {
        type: QueryTypes.RAW,
        raw: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    const {sequelize} = queryInterface
    await sequelize.query(
      `ALTER TABLE users_recipes
       RENAME TO usersRecipes`,
      {
        type: QueryTypes.RAW,
        raw: true
      }
    )
  }
};
