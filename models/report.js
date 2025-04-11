'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Şikayet eden kullanıcı
      Report.belongsTo(models.User, {
        foreignKey: 'reporterId',
        as: 'reporter'
      });

      // Şikayet edilen kullanıcı
      Report.belongsTo(models.User, {
        foreignKey: 'targetUserId',
        as: 'targetUser'
      });

      // Şikayet edilen post
      Report.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post'
      });

      // Şikayet edilen yorum
      Report.belongsTo(models.Comment, {
        foreignKey: 'commentId',
        as: 'comment'
      });
    }
  }
  Report.init({
    reporterId: DataTypes.INTEGER,
    targetUserId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    reason: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};