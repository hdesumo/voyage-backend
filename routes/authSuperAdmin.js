const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ Route unique pour le login SuperAdmin
router.post('/login', authController.loginSuperAdmin);

module.exports = router;

