const { Post } = require('../models');

// Yeni gönderi oluştur
exports.createPost = async (req, res) => {
  try {
    const { caption, location, visibility } = req.body;
    const photo = req.body.photo || null; // opsiyonel fotoğraf
    const userId = req.user.id; // authMiddleware ile gelen kullanıcı ID

    const newPost = await Post.create({
      caption,
      location,
      visibility,
      photo,
      userId
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Post oluşturulamadı', error });
  }
};

// Tüm gönderileri getir
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Postlar alınamadı', error });
  }
};
