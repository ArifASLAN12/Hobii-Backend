module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    visibility: {
      type: DataTypes.ENUM('public', 'followers', 'private'),
      allowNull: false,
      defaultValue: 'public'
    },
    sharedPostId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE'
    });

    Post.belongsToMany(models.User, {
      through: 'PostLikes',
      foreignKey: 'postId',
      otherKey: 'userId',
      as: 'likedByUsers'
    });
  };

  return Post;
};
