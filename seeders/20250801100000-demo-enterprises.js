'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Supprimer les doublons potentiels par email
    await queryInterface.bulkDelete('"Enterprises"', {
      email: ['finexs@voyagemax.net', 'transcam@voyagemax.net']
    });

    // Puis insérer les nouvelles données
    await queryInterface.bulkInsert('"Enterprises"', [
      {
        id: uuidv4(),
        name: 'FINEXS',
        logo: null,
        email: 'finexs@voyagemax.net',
        phone: '+237699597296',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'TransCam',
        logo: null,
        email: 'transcam@voyagemax.net',
        phone: '+237690112233',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('"Enterprises"', {
      email: ['finexs@voyagemax.net', 'transcam@voyagemax.net']
    });
  }
};

