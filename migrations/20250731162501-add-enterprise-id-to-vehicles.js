'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('vehicles', 'enterprise_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Enterprises', // ✅ Correction ici (majuscule)
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('vehicles', 'enterprise_id');
  }
};

