'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Mot de passe = admin123

    await queryInterface.bulkInsert('SuperAdmins', [{
      id: uuidv4(),
      fullname: 'Honoré de Sumo',
      email: 'superadmin@voyagemax.net',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SuperAdmins', { email: 'superadmin@voyagemax.net' }, {});
  }
};

