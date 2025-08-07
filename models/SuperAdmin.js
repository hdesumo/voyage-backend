const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SuperAdmin = sequelize.define('SuperAdmin', {
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
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  timestamps: true,
  freezeTableName: true, // 🚨 Empêche Sequelize d'ajouter un "s" à la fin
  tableName: 'SuperAdmins', // ✅ Correspond exactement au nom de la table
});

module.exports = SuperAdmin;

