const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Connexion pour Railway ou autre service cloud
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // utile pour Railway
      },
    },
  });
} else {
  // Connexion locale
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
    }
  );
}

module.exports = sequelize;

