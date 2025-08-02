'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('agencies', {
      name: ['Agence Douala', 'Agence Yaoundé']
    });

    await queryInterface.bulkInsert('agencies', [
      {
        id: uuidv4(),
        enterprise_id: 'c9e0989d-20ed-489d-8749-e5d9b0396d3d',
        name: 'Agence Douala',
        city: 'Douala, Cameroun',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        enterprise_id: 'c9e0989d-20ed-489d-8749-e5d9b0396d3d',
        name: 'Agence Yaoundé',
        city: 'Yaoundé, Cameroun',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('agencies', {
      name: ['Agence Douala', 'Agence Yaoundé']
    });
  }
};

