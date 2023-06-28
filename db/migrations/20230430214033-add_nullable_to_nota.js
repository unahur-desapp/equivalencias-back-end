'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Materia_aprobada', 'nota', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Materia_aprobada', 'nota', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
