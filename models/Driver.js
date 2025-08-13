module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    licenseNumber: { type: DataTypes.STRING },
    agencyId: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' }
  }, {
    tableName: 'Drivers',
    timestamps: true,
    underscored: true,
  });
  // Driver.associate = (models) => {
  //   Driver.belongsTo(models.Agency, { foreignKey: 'agencyId', as: 'agency' });
  //   Driver.hasMany(models.Trip, { foreignKey: 'driverId', as: 'trips' });
  // };
  return Driver;
};

