'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Estado', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      id_equivalencia: {
        type: Sequelize.INTEGER,
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      mas_informacion: {
        type: Sequelize.STRING,
      },
      en_proceso: {
        type: Sequelize.STRING,
      },
      ingresado: {
        type: Sequelize.STRING,
      },
      aceptado: {
        type: Sequelize.STRING,
      },
      rechazado: {
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
    await queryInterface.dropTable('Estado');
  },
};
