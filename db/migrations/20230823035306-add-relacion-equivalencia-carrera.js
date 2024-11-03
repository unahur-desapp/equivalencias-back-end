'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Equivalencia',
      'CarreraId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carrera',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Equivalencia', 'CarreraId');
  }
};
