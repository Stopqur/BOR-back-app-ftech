'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recipes', [{
      id: 0,
      title: 'name of food',
      description: 'description of food',
      cookingSteps: 'ingredients of food',
      img: '',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recipes', null, {});
  }
};
