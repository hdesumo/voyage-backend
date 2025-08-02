'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('drivers', {
      phone: ['+237699112233']
    });

    await queryInterface.bulkInsert('drivers', [
      {
        id: uuidv4(),
        enterprise_id: 'c9e0989d-20ed-489d-8749-e5d9b0396d3d',
        fullname: 'Jean-Marc Tchatchoua',
        phone: '+237699112233',
        license_number: 'D12345',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('drivers', {
      phone: ['+237699112233']
    });
  }
};

