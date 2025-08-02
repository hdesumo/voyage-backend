'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('"Passengers"', {
      phone: ['+237690000001', '+221770000002']
    });

    await queryInterface.bulkInsert('"Passengers"', [
      {
        id: uuidv4(),
        fullname: 'Alice Mbarga',
        phone: '+237690000001',
        pin: '1234',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        fullname: 'David Diouf',
        phone: '+221770000002',
        pin: '5678',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('"Passengers"', {
      phone: ['+237690000001', '+221770000002']
    });
  }
};

