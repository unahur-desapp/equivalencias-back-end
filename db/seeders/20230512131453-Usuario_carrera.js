'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios_carreras', [
      {
        UsuarioId: 2,
        id_carrera: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UsuarioId: 2,
        id_carrera: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UsuarioId: 2,
        id_carrera: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UsuarioId: 6,
        id_carrera: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UsuarioId: 6,
        id_carrera: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
