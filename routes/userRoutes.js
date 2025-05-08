const express = require('express');
const router = express.Router();
const { signup, login, getMyProfile, updateMyProfile, getUserProfileById } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Kayıt
router.post('/signup', signup);

// Giriş
router.post('/login', login);

// Kendi profilini getir
router.get('/me', protect, getMyProfile);

// Kendi profilini güncelle
router.put('/me', protect, updateMyProfile);

// Başka bir kullanıcının profili
router.get('/:id', protect, getUserProfileById);

module.exports = router;