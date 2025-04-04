const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login
router.post('/login', adminController.login);

// Tüm kullanıcıları listele
router.get('/users', adminController.getUsers);

// Belirli kullanıcıyı getir
router.get('/user/:id', adminController.getUserDetails);

module.exports = router;
