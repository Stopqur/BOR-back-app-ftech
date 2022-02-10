const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CookingStep extends Model {
    static associate(models) {
      models.cooking_steps.belongsTo(models.recipes, {
        as: 'recipes',
        foreignKey: 'recipe_id',
        onDelete: 'CASCADE',
      });
    }
  }
  CookingStep.init(
    {
      name: DataTypes.STRING,
      recipe_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cooking_steps',
      timestamps: true,
    }
  );
  return CookingStep;
};
