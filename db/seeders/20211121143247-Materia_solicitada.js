'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Materia_solicitada', [
      {
        id_equivalencia: 1,
        nombre: 'Introducción a la Programación',
        carrera: 'Tecnicatura en informatica',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id_equivalencia: 2,
        nombre: 'Gramatica 1',
        carrera: 'Profesorado de Ingles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
