'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Materia_aprobada', [
      {
        id_equivalencia: 1,
        nota: 7,
        carga_horaria: 8,
        año_aprobacion: '10-03-2015',
        nombre_materia: 'programacion 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id_equivalencia: 2,
        nota: 9,
        carga_horaria: 8,
        año_aprobacion: '11-11-2019',
        nombre_materia: 'ingles 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
