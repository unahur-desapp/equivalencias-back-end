'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Estado', [
      {
        id_equivalencia: 2,
        observaciones: 'Falta analitico',
        mas_informacion: 'ninguna',
        en_proceso: 'si',
        ingresado: 'si',
        aceptado: 'si',
        rechazado: 'no',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id_equivalencia: 1,
        observaciones: 'ninguna',
        mas_informacion: 'ninguna',
        en_proceso: 'si',
        ingresado: 'si',
        aceptado: 'si',
        rechazado: 'no',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
