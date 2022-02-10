const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersRecipe extends Model {
    static associate() {}
  }
  UsersRecipe.init(
    {
      user_id: DataTypes.INTEGER,
      recipe_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'users_recipes',
      timestamps: true,
    }
  );
  return UsersRecipe;
};
