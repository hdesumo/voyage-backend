const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important pour Railway
    }
  },
  logging: false, // ou true si tu veux voir les requêtes SQL en console
});

module.exports = sequelize;

