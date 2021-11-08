'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equivalencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      datos_universidad: {
        type: Sequelize.STRING,
      },
      id_equivalencia: {
        type: Sequelize.INTEGER,
      },
      datos_carrera: {
        type: Sequelize.STRING,
      },
      datos_materia: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('equivalencia');
  },
};
