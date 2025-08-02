'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', {
      trip_id: '85df55c9-4429-46ac-b582-696b99fc3806',
      passenger_id: '82c0e77e-e865-4a39-85e1-822a049f4e2d',
    });

    await queryInterface.bulkInsert('bookings', [
      {
        id: uuidv4(),
        trip_id: '85df55c9-4429-46ac-b582-696b99fc3806',
        passenger_id: '82c0e77e-e865-4a39-85e1-822a049f4e2d',
        seat_number: '12A',
        status: 'confirmed',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', {
      trip_id: '85df55c9-4429-46ac-b582-696b99fc3806',
      passenger_id: '82c0e77e-e865-4a39-85e1-822a049f4e2d',
    });
  }
};

