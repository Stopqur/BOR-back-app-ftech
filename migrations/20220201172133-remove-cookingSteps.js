'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'recipes',
      'cookingSteps',
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'recipes',
      'cookingSteps',
      Sequelize.STRING
    )
  }
};
