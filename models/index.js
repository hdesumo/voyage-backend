const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
const Admin = require('./Admin')(sequelize, Sequelize.DataTypes);
const Enterprise = require('./Enterprise')(sequelize, Sequelize.DataTypes);
const Passenger = require('./Passenger')(sequelize, Sequelize.DataTypes);
module.exports = { sequelize, Admin, Enterprise, Passenger };