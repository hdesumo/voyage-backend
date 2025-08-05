const { Passenger, Admin, SuperAdmin } = require('../models');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

// ✅ Passenger Register
exports.registerPassenger = async (req, res) => {
  try {
    console.log('📝 Register Passenger:', req.body);
    const { fullname, phone, pin } = req.body;
    const hashedPin = await bcrypt.hash(pin, 10);
    const passenger = await Passenger.create({ fullname, phone, pin: hashedPin });
    const token = generateToken(passenger.id, 'passenger');
    res.json({ token, passenger });
  } catch (err) {
    console.error('🚨 Registration Error:', err);
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

// ✅ Passenger Login
exports.loginPassenger = async (req, res) => {
  try {
    console.log('🔐 Login Passenger:', req.body);
    const { phone, pin } = req.body;
    const passenger = await Passenger.findOne({ where: { phone } });
    if (!passenger) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(pin, passenger.pin);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(passenger.id, 'passenger');
    res.json({ token, passenger });
  } catch (err) {
    console.error('🚨 Passenger Login Error:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

// ✅ Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    console.log('🔐 Login Admin:', req.body);
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(admin.id, 'admin');
    res.json({ token, admin });
  } catch (err) {
    console.error('🚨 Admin Login Error:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

// ✅ SuperAdmin Login (avec logs détaillés)
exports.loginSuperAdmin = async (req, res) => {
  try {
    console.log('🔐 SuperAdmin login request body:', req.body);

    const { email, password } = req.body;

    const superadmin = await SuperAdmin.findOne({ where: { email } });
    if (!superadmin) {
      console.log('❌ SuperAdmin not found with email:', email);
      return res.status(404).json({ error: 'SuperAdmin not found' });
    }

    console.log('🔍 Found superadmin:', superadmin.email);

    const isValid = await bcrypt.compare(password, superadmin.password);
    if (!isValid) {
      console.log('❌ Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(superadmin.id, 'superadmin');
    console.log('✅ SuperAdmin login successful');

    res.json({ token, superadmin });

  } catch (err) {
    console.error('🔥 Login SuperAdmin Error:', err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

// ✅ Profil connecté
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
    console.error('🚨 Get profile error:', err);
    res.status(500).json({ error: 'Error fetching profile', details: err.message });
  }
};

