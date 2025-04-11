'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostLike.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      PostLike.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  PostLike.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostLike',
  });
  return PostLike;
};