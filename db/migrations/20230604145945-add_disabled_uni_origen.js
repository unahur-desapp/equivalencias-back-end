'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Universidad_origen', 'disabled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Valor predeterminado para la nueva columna
      after: 'sigla', // Especificar la columna después de la cual se debe colocar
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Universidad_origen', 'disabled');
  },
};
