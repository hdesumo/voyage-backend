const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');

// 📱 Passenger
router.post('/register/passenger', authController.registerPassenger);
router.post('/login/passenger', authController.loginPassenger);

// 🧑‍💼 Admin
router.post('/login/admin', authController.loginAdmin);

// 👑 SuperAdmin
router.post('/login/superadmin', authController.loginSuperAdmin); // ✅ Correct route

// 🔒 Profil connecté
router.get('/me', authenticate, authController.getProfile);

module.exports = router;

