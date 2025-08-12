'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};

// Initialisation Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Chargement dynamique des modèles
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associations principales
db.Enterprise.hasMany(db.Admin, { foreignKey: 'enterprise_id' });
db.Admin.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Enterprise.hasMany(db.Driver, { foreignKey: 'enterprise_id' });
db.Driver.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Enterprise.hasMany(db.Vehicle, { foreignKey: 'enterprise_id' });
db.Vehicle.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Enterprise.hasMany(db.Trip, { foreignKey: 'enterprise_id' });
db.Trip.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Vehicle.hasMany(db.Trip, { foreignKey: 'vehicle_id' });
db.Trip.belongsTo(db.Vehicle, { foreignKey: 'vehicle_id' });

db.Driver.hasMany(db.Trip, { foreignKey: 'driver_id' });
db.Trip.belongsTo(db.Driver, { foreignKey: 'driver_id' });

db.Trip.hasMany(db.Booking, { foreignKey: 'trip_id' });
db.Booking.belongsTo(db.Trip, { foreignKey: 'trip_id' });

db.Passenger.hasMany(db.Booking, { foreignKey: 'passenger_id' });
db.Booking.belongsTo(db.Passenger, { foreignKey: 'passenger_id' });

// Export Sequelize et tous les modèles
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

