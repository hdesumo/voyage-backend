const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // pour Railway sinon SSL échoue
    },
  },
  logging: false, // désactive les logs SQL (optionnel)
});

module.exports = sequelize;

