'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Usuarios',

      'UsuarioId',
      {
        type: Sequelize.INTEGER,

        references: {
          model: 'Usuarios_carreras',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: '',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Usuarios', 'UsuarioId');
  },
};
