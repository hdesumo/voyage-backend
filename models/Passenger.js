module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define('Passenger', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' }
  }, {
    tableName: 'Passengers',
    timestamps: true,
    underscored: true,
  });
  // Passenger.associate = (models) => {
  //   Passenger.hasMany(models.Booking, { foreignKey: 'passengerId', as: 'bookings' });
  // };
  return Passenger;
};

