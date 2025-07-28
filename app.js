// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const statusRoute = require('./routes/status');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const statusRoute = require('./routes/status');
const authRoute = require('./routes/auth'); // 👈 Nouveau

app.use('/', statusRoute);
app.use('/', authRoute); // 👈 Important : ajoute cette ligne

// Exemple : autres routes peuvent être ajoutées ici
// app.use('/api/users', require('./routes/users'));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

