// me inspiré en
// https://stackoverflow.com/questions/45286429/custom-query-on-sequelize-seeder
// cambiando la notación de Promise a async/await

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const materia1 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '10' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const estado1 = materia1[0].id;

    const materia2 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '11' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const estado2 = materia2[0].id;

    const materia3 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '14' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const estado3 = materia3[0].id;

    const materia4 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '15' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const estado4 = materia4[0].id;

    const materia5 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '11' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const estado5 = materia5[0].id;

    await queryInterface.bulkInsert('Estado', [
      {
        observaciones: 'Falta analitico',
        mas_informacion: 'ninguna',
        en_proceso: 'si',
        ingresado: 'si',
        status: 'aceptado',
        // aceptado: 'si',
        // rechazado: 'no',
        EquivalenciumId: estado1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        observaciones: 'ninguna',
        mas_informacion: 'ninguna',
        en_proceso: 'si',
        ingresado: 'si',
        status: 'aceptado',

        // aceptado: 'si',
        // rechazado: 'no',
        EquivalenciumId: estado2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        observaciones: 'falta fotocopia DNI',
        mas_informacion: 'ninguna',
        en_proceso: 'si',
        ingresado: 'si',
        status: 'rechazado',
        // aceptado: 'no',
        // rechazado: 'si',
        EquivalenciumId: estado3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        observaciones: 'ninguna',
        mas_informacion: 'ninguna',
        en_proceso: 'si',
        ingresado: 'si',
        status: 'rechazado',
        // aceptado: 'si',
        // rechazado: 'no',
        EquivalenciumId: estado4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        observaciones: '',
        mas_informacion: 'ninguna',
        en_proceso: 'si',
        ingresado: 'si',
        status: 'aceptado',
        // aceptado: 'no',
        // rechazado: 'si',
        EquivalenciumId: estado5,
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
