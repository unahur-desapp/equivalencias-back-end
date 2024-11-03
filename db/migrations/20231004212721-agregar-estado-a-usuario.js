'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Usuarios', 'estado', {
      type: Sequelize.STRING,
      allowNull: true, // Opcional, dependiendo de tus requisitos
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Usuarios', 'estado');
  },
};
