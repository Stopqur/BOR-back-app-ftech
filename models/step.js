'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.cookingSteps.belongsTo(models.recipes, {
        as: 'recipes',
        foreignKey: 'recipe_id',
        onDelete: 'CASCADE'
      })
    }
  };
  Step.init({
    name: DataTypes.STRING,
    recipe_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cookingSteps',
    timestamps: true
  });
  return Step;
};