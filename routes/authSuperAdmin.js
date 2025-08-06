// routes/authSuperAdmin.js

const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController'); // ✅ Corrigé ici

router.post('/login', superAdminController.loginSuperAdmin); // ✅ Fonction correcte

module.exports = router;

