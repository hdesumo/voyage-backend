const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SuperAdmin } = require('../models');
const authController = require('../controllers/authController');

router.post('/login', authController.loginSuperAdmin);
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ where: { email } });
    if (!superAdmin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: superAdmin.id, role: 'superadmin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: superAdmin.id,
        email: superAdmin.email,
        full_name: superAdmin.full_name,
        role: 'superadmin',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

