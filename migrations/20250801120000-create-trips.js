'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trips', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true
      },
      enterprise_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Enterprises', key: 'id' },
        onDelete: 'CASCADE'
      },
      departure: Sequelize.STRING,
      arrival: Sequelize.STRING,
      departure_time: Sequelize.DATE,
      vehicle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Vehicles', key: 'id' },
        onDelete: 'SET NULL'
      },
      driver_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Drivers', key: 'id' },
        onDelete: 'SET NULL'
      },
      price: Sequelize.DECIMAL(10, 2),
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Trips');
  }
};

