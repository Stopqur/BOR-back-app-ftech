'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.belongsTo(models.users, {
        as: 'users',
        foreignKey: 'user_id'
      });
      Recipe.hasMany(models.cookingSteps, {
        as: 'cookingSteps',
        foreignKey: 'recipe_id'
      });
      Recipe.belongsToMany(models.users, {as: 'User', through: models.usersRecipes, foreignKey: 'recipe_id'})
    }
  };
  Recipe.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    complexity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipes',
    timestamps: true
  });
  return Recipe;
};