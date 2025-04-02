const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// Kayıt
router.post('/signup', signup);

// Giriş
router.post('/login', login);

module.exports = router;