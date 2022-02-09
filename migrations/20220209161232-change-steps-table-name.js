'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {sequelize} = queryInterface

    await sequelize.query(
      `ALTER TABLE cookingSteps
       RENAME TO cooking_steps`,
      {
        type: QueryTypes.RAW,
        raw: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    const {sequelize} = queryInterface

    await sequelize.query(
      `ALTER TABLE cooking_steps
       RENAME TO cookingSteps`,
      {
        type: QueryTypes.RAW,
        raw: true
      }
    )
  }
};
