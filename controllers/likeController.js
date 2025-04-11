const { Post, User } = require('../models');

// Post'u beğen
const likePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post bulunamadı.' });
    }

    await post.addLikedByUser(userId);
    res.status(200).json({ message: 'Post beğenildi.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Beğeni başarısız.' });
  }
};

// Post'tan beğeni kaldır
const unlikePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post bulunamadı.' });
    }

    await post.removeLikedByUser(userId);
    res.status(200).json({ message: 'Beğeni kaldırıldı.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Beğeni silme başarısız.' });
  }
};

// Post'un beğeni listesini al
const getLikes = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId, {
      include: [{
        model: User,
        as: 'likedByUsers',
        attributes: ['id', 'username', 'email']
      }]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post bulunamadı.' });
    }

    res.status(200).json({ likes: post.likedByUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Beğeniler getirilemedi.' });
  }
};

module.exports = {
  likePost,
  unlikePost,
  getLikes
};
