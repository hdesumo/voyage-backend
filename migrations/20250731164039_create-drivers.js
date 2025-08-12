'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drivers', {
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
      fullname: Sequelize.STRING,
      phone: Sequelize.STRING,
      license_number: Sequelize.STRING,
      status: {
        type: Sequelize.ENUM('available', 'unavailable'),
        defaultValue: 'available'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Drivers');
  }
};

