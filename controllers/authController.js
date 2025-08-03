const { Passenger, Admin, SuperAdmin } = require('../models');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

exports.registerPassenger = async (req, res) => {
  try {
    const { fullname, phone, pin } = req.body;
    const hashedPin = await bcrypt.hash(pin, 10);
    const passenger = await Passenger.create({ fullname, phone, pin: hashedPin });
    const token = generateToken(passenger.id, 'passenger');
    res.json({ token, passenger });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

exports.loginPassenger = async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const passenger = await Passenger.findOne({ where: { phone } });
    if (!passenger) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(pin, passenger.pin);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(passenger.id, 'passenger');
    res.json({ token, passenger });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(admin.id, 'admin');
    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

exports.loginSuperAdmin = async (req, res) => {
  console.log('🚀 loginSuperAdmin appelé !');
  console.log('📥 Body reçu:', req.body);
  
  try {
    const { email, password } = req.body;
    
    console.log('🔍 Recherche SuperAdmin avec email:', email);
    
    // Vérifiez si le modèle SuperAdmin existe
    if (!SuperAdmin) {
      console.error('❌ Modèle SuperAdmin non trouvé !');
      return res.status(500).json({ error: 'Modèle SuperAdmin manquant' });
    }
    
    const superadmin = await SuperAdmin.findOne({ where: { email } });
    console.log('👤 SuperAdmin trouvé:', superadmin ? 'OUI' : 'NON');
    
    if (!superadmin) {
      console.log('❌ Aucun SuperAdmin avec cet email');
      return res.status(404).json({ error: 'SuperAdmin not found' });
    }

    console.log('🔐 Vérification du mot de passe...');
    const isValid = await bcrypt.compare(password, superadmin.password);
    console.log('✅ Mot de passe valide:', isValid ? 'OUI' : 'NON');
    
    if (!isValid) {
      console.log('❌ Mot de passe incorrect');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('🎟️ Génération du token...');
    
    // Vérifiez si generateToken existe
    if (!generateToken) {
      console.error('❌ Fonction generateToken non trouvée !');
      return res.status(500).json({ error: 'generateToken manquant' });
    }
    
    const token = generateToken(superadmin.id, 'superadmin');
    console.log('✅ Token généré avec succès');
    
    console.log('📤 Envoi de la réponse...');
    res.json({ token, superadmin });
    
  } catch (err) {
    console.error('💥 Erreur dans loginSuperAdmin:', err);
    console.error('💥 Stack:', err.stack);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { role, id } = req.user;
    let user = null;

    if (role === 'passenger') {
      user = await Passenger.findByPk(id);
    } else if (role === 'admin') {
      user = await Admin.findByPk(id);
    } else if (role === 'superadmin') {
      user = await SuperAdmin.findByPk(id);
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ role, user });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching profile', details: err.message });
  }
};
