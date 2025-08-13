module.exports = (sequelize, DataTypes) => {
  const Agency = sequelize.define('Agency', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' }
  }, {
    tableName: 'Agencies',
    timestamps: true,
    underscored: true,
  });
  // Agency.associate = (models) => {
  //   Agency.hasMany(models.AgencyAdmin, { foreignKey: 'agencyId', as: 'admins' });
  //   Agency.hasMany(models.Vehicle, { foreignKey: 'agencyId', as: 'vehicles' });
  // };
  return Agency;
};

