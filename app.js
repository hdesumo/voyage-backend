// Charger les variables d'environnement AVANT toute utilisation
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./config/database');

// --- Import des routes
const authRoutes = require('./routes/authRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const adminRoutes = require('./routes/adminRoutes');
const enterpriseRoutes = require('./routes/enterpriseRoutes');
const agencyAdminRoutes = require('./routes/agencyAdminRoutes');
const driverRoutes = require('./routes/driverRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const tripRoutes = require('./routes/tripRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

/* =========================
   C O R S   C O N F I G
   ========================= */
const allowedOrigins = (process.env.ALLOW_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    // Autorise outils sans origin (Postman/cURL) + origins whitelistées
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return cb(null, true);
    }
    console.error('❌ CORS blocked for origin:', origin);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight global

// En-têtes additionnels utiles derrière proxy/CDN
app.use((req, res, next) => {
  const o = req.headers.origin;
  if (!o || allowedOrigins.includes(o) || allowedOrigins.includes('*')) {
    if (o) {
      res.header('Access-Control-Allow-Origin', o);
      res.header('Vary', 'Origin');
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    // Expose si tu veux lire certains headers côté front (optionnel)
    res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/* =========================
   M I D D L E W A R E S
   ========================= */
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

/* =========================
   H E A L T H C H E C K
   ========================= */
app.get('/', (_req, res) => res.json({ status: 'API is running.' }));
app.get('/status', (_req, res) => res.json({ status: 'OK', ts: new Date().toISOString() }));

/* =========================
   D A T A B A S E
   ========================= */
db.authenticate()
  .then(() => {
    console.log('✅ Connected to the database.');
    return db.sync({ alter: true });
  })
  .then(() => console.log('✅ All models were synchronized.'))
  .catch(err => console.error('❌ Database error:', err));

/* =========================
   R O U T E S
   ========================= */
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/enterprises', enterpriseRoutes);
app.use('/api/agency-admins', agencyAdminRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);

/* =========================
   S E R V E R
   ========================= */
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

