module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fromCity: { type: DataTypes.STRING, allowNull: false },
    toCity: { type: DataTypes.STRING, allowNull: false },
    departureAt: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    vehicleId: { type: DataTypes.UUID, allowNull: false },
    driverId: { type: DataTypes.UUID, allowNull: false },
    agencyId: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.ENUM('scheduled','running','done','canceled'), defaultValue: 'scheduled' }
  }, {
    tableName: 'Trips',
    timestamps: true,
    underscored: true,
  });
  // Trip.associate = (models) => {
  //   Trip.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });
  //   Trip.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });
  //   Trip.belongsTo(models.Agency, { foreignKey: 'agencyId', as: 'agency' });
  //   Trip.hasMany(models.Booking, { foreignKey: 'tripId', as: 'bookings' });
  // };
  return Trip;
};

