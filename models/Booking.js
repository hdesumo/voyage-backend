module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    tripId: { type: DataTypes.UUID, allowNull: false },
    passengerId: { type: DataTypes.UUID, allowNull: false },
    seats: { type: DataTypes.INTEGER, defaultValue: 1 },
    amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.ENUM('pending','paid','canceled'), defaultValue: 'pending' }
  }, {
    tableName: 'Bookings',
    timestamps: true,
    underscored: true,
  });
  // Booking.associate = (models) => {
  //   Booking.belongsTo(models.Trip, { foreignKey: 'tripId', as: 'trip' });
  //   Booking.belongsTo(models.Passenger, { foreignKey: 'passengerId', as: 'passenger' });
  // };
  return Booking;
};

