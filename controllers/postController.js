const { Post } = require('../models');

// Yeni gönderi oluştur
exports.createPost = async (req, res) => {
  try {
    const { caption, location, visibility } = req.body;
    const photo = req.body.photo || null; // opsiyonel fotoğraf
    const userId = req.user.id; // authMiddleware ile gelen kullanıcı ID

    // Validation for required fields
    if (!caption || !location) {
      return res.status(400).json({ message: 'Caption ve location alanları zorunludur.' });
    }

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

// Belirli bir kullanıcının gönderilerini getir
exports.getPostsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findAll({
      where: { userId: id },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ message: 'Kullanıcının gönderileri başarıyla getirildi.', posts });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcının gönderileri alınamadı', error });
  }
};

// Belirli bir gönderiyi getir
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı.' });
    }
    res.status(200).json({ message: 'Gönderi başarıyla getirildi.', post });
  } catch (error) {
    res.status(500).json({ message: 'Gönderi alınamadı', error });
  }
};

// Gönderiyi güncelle
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, location, visibility, photo } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Güncellenecek gönderi bulunamadı.' });
    }

    await post.update({ caption, location, visibility, photo });
    res.status(200).json({ message: 'Gönderi başarıyla güncellendi.', post });
  } catch (error) {
    res.status(500).json({ message: 'Gönderi güncellenemedi', error });
  }
};

// Gönderiyi sil
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Silinecek gönderi bulunamadı.' });
    }

    await post.destroy();
    res.status(200).json({ message: 'Gönderi başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Gönderi silinemedi', error });
  }
};

// Tüm gönderileri getir
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ message: 'Postlar başarıyla getirildi.', posts });
  } catch (error) {
    res.status(500).json({ message: 'Postlar alınamadı', error });
  }
};
