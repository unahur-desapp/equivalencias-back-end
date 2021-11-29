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
    const equi1 = materia1[0].id;

    const materia2 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '11' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const equi2 = materia2[0].id;

    const materia3 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '14' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const equi3 = materia3[0].id;

    const materia4 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '15' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const equi4 = materia4[0].id;

    const materia5 = await queryInterface.sequelize.query(
      `SELECT id FROM "Equivalencia" WHERE id_equivalencia = '11' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const equi5 = materia5[0].id;

    await queryInterface.bulkInsert('Materia_aprobada', [
      {
        nota: 7,
        carga_horaria: 8,
        año_aprobacion: '10-03-2015',
        nombre_materia: 'Gramática I',
        EquivalenciumId: equi1,
        //UniversidadOrigenID:cod1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nota: 9,
        carga_horaria: 8,
        año_aprobacion: '10-03-2015',
        nombre_materia: 'Programacion 1',
        EquivalenciumId: equi2,
        //UniversidadOrigenID:cod2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nota: 7,
        carga_horaria: 6,
        año_aprobacion: '25-11-2020',
        nombre_materia: 'Quimica General',
        EquivalenciumId: equi3,
        //UniversidadOrigenID:cod3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nota: 8,
        carga_horaria: 8,
        año_aprobacion: '20-11-2019',
        nombre_materia: 'Pedagogía I',
        EquivalenciumId: equi4,
        //UniversidadOrigenID:cod4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nota: 9,
        carga_horaria: 8,
        año_aprobacion: '9-12-2018',
        nombre_materia: 'Programación con Objetos I',
        EquivalenciumId: equi5,
        //UniversidadOrigenID:cod5,
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
