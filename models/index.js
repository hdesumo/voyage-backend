const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation des modèles
db.SuperAdmin = require('./SuperAdmin')(sequelize, Sequelize.DataTypes);
db.Enterprise = require('./Enterprise')(sequelize, Sequelize.DataTypes);
db.Admin = require('./Admin')(sequelize, Sequelize.DataTypes);
db.Agency = require('./Agency')(sequelize, Sequelize.DataTypes);
db.Driver = require('./Driver')(sequelize, Sequelize.DataTypes);
db.Vehicle = require('./Vehicle')(sequelize, Sequelize.DataTypes);
db.Passenger = require('./Passenger')(sequelize, Sequelize.DataTypes);
db.Trip = require('./Trip')(sequelize, Sequelize.DataTypes);
db.Booking = require('./Booking')(sequelize, Sequelize.DataTypes);

// Associations
db.Enterprise.hasMany(db.Admin, { foreignKey: 'enterprise_id' });
db.Admin.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Enterprise.hasMany(db.Agency, { foreignKey: 'enterprise_id' });
db.Agency.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Enterprise.hasMany(db.Driver, { foreignKey: 'enterprise_id' });
db.Driver.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Enterprise.hasMany(db.Vehicle, { foreignKey: 'enterprise_id' });
db.Vehicle.belongsTo(db.Enterprise, { foreignKey: 'enterprise_id' });

db.Vehicle.hasMany(db.Trip, { foreignKey: 'vehicle_id' });
db.Trip.belongsTo(db.Vehicle, { foreignKey: 'vehicle_id' });

db.Driver.hasMany(db.Trip, { foreignKey: 'driver_id' });
db.Trip.belongsTo(db.Driver, { foreignKey: 'driver_id' });

db.Agency.hasMany(db.Trip, { as: 'departures', foreignKey: 'departure_agency_id' });
db.Agency.hasMany(db.Trip, { as: 'arrivals', foreignKey: 'arrival_agency_id' });
db.Trip.belongsTo(db.Agency, { as: 'departureAgency', foreignKey: 'departure_agency_id' });
db.Trip.belongsTo(db.Agency, { as: 'arrivalAgency', foreignKey: 'arrival_agency_id' });

db.Trip.hasMany(db.Booking, { foreignKey: 'trip_id' });
db.Booking.belongsTo(db.Trip, { foreignKey: 'trip_id' });

db.Passenger.hasMany(db.Booking, { foreignKey: 'passenger_id' });
db.Booking.belongsTo(db.Passenger, { foreignKey: 'passenger_id' });

module.exports = db;

