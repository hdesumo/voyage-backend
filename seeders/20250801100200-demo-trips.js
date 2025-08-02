'use strict';
const { v4: uuidv4 } = require('uuid');

const tripId = uuidv4(); // à réutiliser dans booking

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('trips', [
      {
        id: tripId,
        enterprise_id: 'bbb209ff-0a79-45aa-aa53-6514e2d15039',
        agency_id: '2326d4c8-bf24-4b87-9824-fc1a2ba15c5f',
        driver_id: 'a151786b-fbba-4e79-b616-493002a74ea1',
        vehicle_id: '8d8f673b-adba-4b72-ac74-10973ee8cb5a',
        origin: 'Douala',
        destination: 'Yaoundé',
        departure_time: new Date(Date.now() + 3600000), // +1h
        arrival_time: new Date(Date.now() + 21600000),  // +6h
        price: 4500,
        status: 'scheduled',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trips', {
      origin: 'Douala',
      destination: 'Yaoundé'
    });
  }
};

