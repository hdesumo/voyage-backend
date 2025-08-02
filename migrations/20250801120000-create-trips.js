'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      enterprise_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Enterprises', key: 'id' },
        onDelete: 'CASCADE',
      },
      agency_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'agencies', key: 'id' },
        onDelete: 'CASCADE',
      },
      driver_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'drivers', key: 'id' },
        onDelete: 'CASCADE',
      },
      vehicle_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'vehicles', key: 'id' },
        onDelete: 'CASCADE',
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departure_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrival_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'completed', 'cancelled'),
        defaultValue: 'scheduled',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('trips');
  }
};

