'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'recipes',
      'cookingTime',
      Sequelize.INTEGER
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'recipes',
      'cookingTime',
      Sequelize.INTEGER
    )
  }
};
