'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Carrera', [
      {
        nombre_carrera: 'Tecnicatura en informatica',
        nombre_instituto: 'Instituto de Informática',
        activo: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_carrera: 'Profesorado de Ingles',
        nombre_instituto: 'Instituto de Lenguas',
        activo: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_carrera: 'Lic. en Biotecnologia',
        nombre_instituto: 'Instituto de Biología',
        activo: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_carrera: 'Lic. en Educacion',
        nombre_instituto: 'Instituto de Educación',
        activo: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_carrera: 'Tec. en Metalurgica',
        nombre_instituto: 'Instituto de Metalurgia',
        activo: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carrera', null, {});
  }
};