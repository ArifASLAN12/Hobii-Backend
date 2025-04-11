const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authenticate = require('../middleware/authMiddleware');

// Şikayet gönderme (sadece giriş yapmış kullanıcı)
router.post('/', authenticate, reportController.createReport);

module.exports = router;
