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
      id_equivalencia: {
        type: Sequelize.INTEGER,
      },
      dni_usuario: {
        type: Sequelize.INTEGER,
      },
      datos_universidad: {
        type: Sequelize.STRING,
      },
      nombre_carrera: {
        type: Sequelize.STRING,
      },
      nombre_materia: {
        type: Sequelize.STRING,
      },
      instituto: {
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
