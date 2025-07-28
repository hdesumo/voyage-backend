// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const statusRoutes = require('./routes/status');
// const authRoutes = require('./routes/auth'); // à décommenter si tu as ce fichier

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', statusRoutes);
// app.use('/auth', authRoutes); // exemple

// Fallback route (utile pour tester en cas d'erreur 404)
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`);
});

