module.exports = (sequelize, DataTypes) => {
  const Enterprise = sequelize.define('Enterprise', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' }
  }, {
    tableName: 'Enterprises',
    timestamps: true,
    underscored: true,
  });
  // Enterprise.associate = (models) => {};
  return Enterprise;
};

