'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.recipes, {as: 'Recipe', through: models.users_recipes, foreignKey: 'user_id'})
      
      User.hasMany(models.recipes, {
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dob: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true
  });
  return User;
};