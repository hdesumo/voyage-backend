// controllers/superAdminController.js

const { SuperAdmin } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fonction de connexion du SuperAdmin
exports.loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifie que l'email existe
    const superAdmin = await SuperAdmin.findOne({ where: { email } });

    if (!superAdmin) {
      return res.status(404).json({ error: 'SuperAdmin not found' });
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, superAdmin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { id: superAdmin.id, role: 'superadmin' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      superAdmin: {
        id: superAdmin.id,
        email: superAdmin.email,
        fullname: superAdmin.fullname,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

