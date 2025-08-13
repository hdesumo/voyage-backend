// models/AgencyAdmin.js
module.exports = (sequelize, DataTypes) => {
  const AgencyAdmin = sequelize.define('AgencyAdmin', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agencyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    }
  }, {
    tableName: 'AgencyAdmins',   // adapte si ton nom réel diffère
    timestamps: true,            // crée/attend created_at & updated_at
    underscored: true,           // snake_case: created_at / updated_at
  });

  // Associations éventuelles :
  // AgencyAdmin.associate = (models) => {
  //   AgencyAdmin.belongsTo(models.Agency, { foreignKey: 'agencyId', as: 'agency' });
  // };

  return AgencyAdmin;
};

