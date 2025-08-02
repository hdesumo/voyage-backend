'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vehicles', 'assurance_expiry', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('vehicles', 'visite_technique_expiry', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('vehicles', 'assurance_expiry');
    await queryInterface.removeColumn('vehicles', 'visite_technique_expiry');
  }
};

