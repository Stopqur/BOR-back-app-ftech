const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.belongsTo(models.users, {
        as: 'users',
        foreignKey: 'user_id',
      });
      Recipe.hasMany(models.cooking_steps, {
        as: 'cooking_steps',
        foreignKey: 'recipe_id',
      });
      Recipe.belongsToMany(models.users, {
        as: 'User',
        through: models.users_recipes,
        foreignKey: 'recipe_id',
      });
    }
  }
  Recipe.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      img: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      complexity: DataTypes.INTEGER,
      cookingTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'recipes',
      timestamps: true,
    }
  );
  return Recipe;
};
