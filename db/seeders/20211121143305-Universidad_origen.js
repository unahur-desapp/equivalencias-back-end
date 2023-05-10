'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Universidad_origen', [
      {
        nombre_universidad: 'Universidad Tecnológica Nacional',
        localidad: 'Haedo',
        sigla: 'UTN',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nombre_universidad: 'Universidad de Buenos Aires',
        localidad: 'CABA',
        sigla: 'UBA',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_universidad: 'Universidad de la Matanza',
        localidad: 'San Justo',
        sigla: 'UNLaM',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nombre_universidad: 'Universidad Nacional de San Martin',
        localidad: 'San Martin',
        sigla: 'UNSAM',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nombre_universidad: 'Universidad Nacional de La Plata',
        localidad: 'San Martin',
        sigla: 'UNLP',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nombre_universidad: 'Universidad de Buenos Aires',
        localidad: 'CABA',
        sigla: 'UBA',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nombre_universidad: 'Universidad de Morón',
        localidad: 'Moron',
        sigla: 'UM',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_universidad: 'Instituto tecnologico de Buenos Aires',
        localidad: 'CABA',
        sigla: 'ITBA',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_universidad: 'Universidad del Salvador',
        localidad: 'CABA',
        sigla: 'USL',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre_universidad: 'Instituto Don torcuato di tella',
        localidad: 'CABA',
        sigla: 'ITDT',
        disabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
