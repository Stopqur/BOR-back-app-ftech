'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'recipes',
      'complexity',
      Sequelize.INTEGER
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'recipes',
      'complexity',
      Sequelize.INTEGER
    )
  }
};
