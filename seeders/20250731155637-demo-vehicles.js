'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', {
      license_plate: ['CM-1234-DLA']
    });

    await queryInterface.bulkInsert('vehicles', [
      {
        id: uuidv4(),
        enterprise_id: 'bbb209ff-0a79-45aa-aa53-6514e2d15039',
        license_plate: 'CM-1234-DLA',
        model: 'Toyota Coaster',
        seats_count: 30,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', {
      license_plate: ['CM-1234-DLA']
    });
  }
};

