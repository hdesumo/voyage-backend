require('dotenv').config(); // Assure-toi d'avoir installé dotenv

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'voyagemax',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false, // Désactive les logs SQL dans la console
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
};

