'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Mensajes',
      'id_equivalencia',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equivalencia',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Mensajes', 'id_equivalencia');
  }
};
