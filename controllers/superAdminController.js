const SuperAdmin = require('../models/SuperAdmin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifie que les champs sont fournis
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // 2. Recherche du SuperAdmin par email
    const superAdmin = await SuperAdmin.findOne({ where: { email } });

    if (!superAdmin) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 3. Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, superAdmin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 4. Génération du token JWT
    const token = jwt.sign(
      { id: superAdmin.id, role: 'superadmin' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    // 5. Réponse
    return res.status(200).json({
      message: 'Login successful',
      token,
      superAdmin: {
        id: superAdmin.id,
        email: superAdmin.email,
        fullname: superAdmin.fullname
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

