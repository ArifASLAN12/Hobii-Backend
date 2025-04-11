const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authenticate = require('../middleware/authMiddleware');

// Takip etme
router.post('/:id/follow', authenticate, followController.followUser);

// Takipten çıkma
router.delete('/:id/unfollow', authenticate, followController.unfollowUser);

// Takipçileri getir
router.get('/:id/followers', authenticate, followController.getFollowers);

// Takip edilenleri getir
router.get('/:id/following', authenticate, followController.getFollowing);

module.exports = router;
