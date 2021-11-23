'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      {
        dni: 30563652,
        nombre: 'Enzo',
        apellido: 'Fernandez',
        email: 'enzo@gmail.com',
        discord: '@enzoF',
        telefono: 44595568,
        rol: 'alumno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        dni: 20569859,
        nombre: 'Anthony ',
        apellido: 'kiedis',
        email: 'RHCP@gmail.com',
        discord: '@Anthony55',
        telefono: 1523698547,
        rol: 'directivo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        dni: 35025698,
        nombre: 'Liam',
        apellido: 'Gallagher',
        email: 'Liam595@hotmail.com',
        discord: 'Liam99',
        telefono: 1123968547,
        rol: 'alumno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
