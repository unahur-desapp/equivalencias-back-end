'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Materia_solicitada', 'carrera', {
      type: Sequelize.STRING,
      after: 'EquivalenciumId', // Especificar la columna después de la cual se debe colocar
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      // en que tabla
      'Materia_solicitada',
      // nombre de la columna
      'carrera'
    );
  },
};
