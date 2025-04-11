const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// Giriş route'u (korumasız)
router.post('/login', adminController.login);

// Aşağıdaki route'lar sadece admin token ile erişilebilir
router.get('/users', adminAuth, adminController.getUsers);
router.get('/user/:id', adminAuth, adminController.getUserDetails);
router.get('/reports/:id', adminAuth, adminController.getReportDetail);
router.patch('/user/:id/block', adminAuth, adminController.blockUser);
router.patch('/user/:id/unblock', adminAuth, adminController.unblockUser);

module.exports = router;