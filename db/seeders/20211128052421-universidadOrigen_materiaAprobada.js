// me inspiré en
// https://stackoverflow.com/questions/45286429/custom-query-on-sequelize-seeder
// cambiando la notación de Promise a async/await

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const universidad1 = await queryInterface.sequelize.query(
      `SELECT id FROM "Universidad_origen" WHERE codigo = '20' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const cod1 = universidad1[0].id;

    const universidad2 = await queryInterface.sequelize.query(
      `SELECT id FROM "Universidad_origen" WHERE codigo = '21' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const cod2 = universidad2[0].id;

    const universidad3 = await queryInterface.sequelize.query(
      `SELECT id FROM "Universidad_origen" WHERE codigo = '22' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const cod3 = universidad3[0].id;

    const universidad4 = await queryInterface.sequelize.query(
      `SELECT id FROM "Universidad_origen" WHERE codigo = '23' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const cod4 = universidad4[0].id;

    const universidad5 = await queryInterface.sequelize.query(
      `SELECT id FROM "Universidad_origen" WHERE codigo = '24' `,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const cod5 = universidad5[0].id;

    await queryInterface.bulkInsert('Materia_aprobada', [
      {
        UniversidadOrigenId: cod1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        UniversidadOrigenId: cod2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        UniversidadOrigenId: cod3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        UniversidadOrigenId: cod4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        UniversidadOrigenId: cod5,
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
