'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      trip_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Trips', key: 'id' },
        onDelete: 'CASCADE'
      },
      passenger_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Passengers', key: 'id' },
        onDelete: 'CASCADE'
      },
      seat_number: Sequelize.INTEGER,
      status: {
        type: Sequelize.ENUM('confirmed', 'cancelled'),
        defaultValue: 'confirmed'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Bookings');
  }
};

