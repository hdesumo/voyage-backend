const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/database');

// Import routes
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
const authSuperAdminRoutes = require('./routes/authSuperAdmin');

dotenv.config();

const app = express();

// ✅ 1. CORS
const allowedOrigins = [
  'https://superadmin.voyagemax.net',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ✅ 2. Headers manuels
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// ✅ 3. Sécurité & parsing
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// ✅ 4. Test route
app.get('/', (req, res) => {
  res.json({ status: 'API is running.' });
});

// ✅ 5. Database
db.authenticate()
  .then(() => {
    console.log('✅ Connected to the database.');
    return db.sync({ alter: true }); // facultatif : { force: true } pour reset
  })
  .then(() => console.log('✅ All models were synchronized.'))
  .catch(err => console.error('❌ Database error:', err));

// ✅ 6. Routes
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
app.use('/api/auth/superadmin', authSuperAdminRoutes);

// ✅ 7. Lancement serveur
const PORT = process.env.PORT || 8080;
console.log('🎯 PORT from env:', PORT);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

