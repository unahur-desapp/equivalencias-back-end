'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Materia_aprobada', 'archivo', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null, // Valor predeterminado para la nueva columna
      after: 'certificado', // Especificar la columna después de la cual se debe colocar
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Materia_aprobada', 'archivo');
  },
};
