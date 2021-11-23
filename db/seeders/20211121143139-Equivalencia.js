'use strict';

// me inspiré en
// https://stackoverflow.com/questions/45286429/custom-query-on-sequelize-seeder
// cambiando la notación de Promise a async/await

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const product1Data = await queryInterface.sequelize.query(
      `SELECT id FROM "Usuarios" WHERE dni = '30563652' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const dniUsuario = product1Data[0].id;

    const product2Data = await queryInterface.sequelize.query(
      `SELECT id FROM "Usuarios" WHERE dni = '35025698' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const dniUsuario2 = product2Data[0].id;

    await queryInterface.bulkInsert('Equivalencia', [
      {
        nombre_universidad: 'Universidad Nacional de Hurlingham',
        nombre_carrera: 'Profesorado Universitario de Ingles',
        instituto: 'ninguno',
        UsuarioId: dniUsuario,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_universidad: 'Universidad Nacional de Hurlingham',
        nombre_carrera: 'Tecnicatura en Informatica',
        instituto: 'ninguno',
        UsuarioId: dniUsuario2,
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
