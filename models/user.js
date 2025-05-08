'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Hobby, {
        through: 'UserHobbies',
        foreignKey: 'userId',
        otherKey: 'hobbyId',
      });
      User.belongsToMany(models.Post, {
        through: 'PostLikes',
        foreignKey: 'userId',
        otherKey: 'postId',
        as: 'likedPosts'
      });
      User.hasMany(models.Follow, {
        foreignKey: 'followerId',
        as: 'following'
      });
      User.hasMany(models.Follow, {
        foreignKey: 'followingId',
        as: 'followers'
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};