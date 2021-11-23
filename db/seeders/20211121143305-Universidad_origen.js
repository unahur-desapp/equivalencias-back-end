'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Universidad_origen', [
      {
        id_equivalencia: 1,
        nombre: 'Universidad Tecnológica Nacional',
        localidad: 'Haedo',
        sigla: 'UTN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id_equivalencia: 2,
        nombre: 'Universidad de Buenos Aires',
        localidad: 'CABA',
        sigla: 'UBA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
