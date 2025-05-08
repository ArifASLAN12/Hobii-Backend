const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');

// Post'u beğen
router.post('/:postId/like', authenticate, likeController.likePost);

// Beğeni kaldır
router.delete('/:postId/unlike', authenticate, likeController.unlikePost);

// Beğeni listesini getir
router.get('/:postId/likes', authenticate, likeController.getLikes);

// Yeni post oluştur
router.post('/create', authenticate, postController.createPost);

// Tüm postları getir
router.get('/all', authenticate, postController.getAllPosts);

// Belirli bir kullanıcıya ait tüm postları getir
router.get('/user/:userId', authenticate, postController.getPostsByUserId);

// Tek bir postu getir
router.get('/:id', authenticate, postController.getPostById);

// Postu güncelle
router.put('/:id', authenticate, postController.updatePost);

// Postu sil
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;
