const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authenticate = require('../middleware/authMiddleware');

// Post'u beğen
router.post('/:postId/like', authenticate, likeController.likePost);

// Beğeni kaldır
router.delete('/:postId/unlike', authenticate, likeController.unlikePost);

// Beğeni listesini getir
router.get('/:postId/likes', authenticate, likeController.getLikes);

module.exports = router;
