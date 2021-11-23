'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Materia_aprobada', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      id_equivalencia: {
        type: Sequelize.INTEGER,
      },
      nota: {
        type: Sequelize.INTEGER,
      },
      carga_horaria: {
        type: Sequelize.INTEGER,
      },
      año_aprobacion: {
        type: Sequelize.DATE,
      },
      nombre_materia: {
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
    await queryInterface.dropTable('Materia_aprobada');
  },
};
