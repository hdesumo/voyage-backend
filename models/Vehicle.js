module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    plateNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    capacity: { type: DataTypes.INTEGER, defaultValue: 50 },
    agencyId: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' }
  }, {
    tableName: 'Vehicles',
    timestamps: true,
    underscored: true,
  });
  // Vehicle.associate = (models) => {
  //   Vehicle.belongsTo(models.Agency, { foreignKey: 'agencyId', as: 'agency' });
  //   Vehicle.hasMany(models.Trip, { foreignKey: 'vehicleId', as: 'trips' });
  // };
  return Vehicle;
};

