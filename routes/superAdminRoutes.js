// routes/superAdminRoutes.js

const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');

// Route de connexion du super admin
router.post('/login', superAdminController.loginSuperAdmin);

module.exports = router;

