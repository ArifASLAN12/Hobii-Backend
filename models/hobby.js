'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hobby.belongsToMany(models.User, {
        through: 'UserHobbies',
        foreignKey: 'hobbyId',
        otherKey: 'userId',
      });
    }
  }
  Hobby.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hobby',
  });
  return Hobby;
};