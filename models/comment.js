module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post'
    });
  };

  return Comment;
};
