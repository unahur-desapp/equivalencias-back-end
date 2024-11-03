'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Mensajes', [
      {
        texto: 'Hola, Enzo Fernandez ¿cómo estás?',
        id_remitente: 2,
        createdAt: '2023-06-27T12:36:00.622Z',
        updatedAt: '2023-06-27T12:36:00.622Z',
        id_equivalencia: 1,
      },
      {
        texto:
          'Te hablo por tu solicitud de equivalencia en la materia Introducción a la Programación',
        id_remitente: 2,
        createdAt: '2023-06-27T12:36:30.622Z',
        updatedAt: '2023-06-27T12:36:30.622Z',
        id_equivalencia: 1,
      },
      {
        texto: '¿Podrías enviarme tu certificado de aprobación de la materia?',
        id_remitente: 2,
        createdAt: '2023-06-27T12:37:10.622Z',
        updatedAt: '2023-06-27T12:37:10.622Z',
        id_equivalencia: 1,
      },

      {
        texto: 'Hola Anthony, buen día',
        id_remitente: 1,
        createdAt: '2023-06-27T14:16:30.622Z',
        updatedAt: '2023-06-27T14:16:30.622Z',
        id_equivalencia: 1,
      },
      {
        texto: 'Te adjunto mi certificado de aprobación de la materia',
        id_remitente: 1,
        createdAt: '2023-06-27T14:17:00.622Z',
        updatedAt: '2023-06-27T14:17:00.622Z',
        id_equivalencia: 1,
      },
      {
        texto: 'Gracias, Enzo',
        id_remitente: 2,
        createdAt: '2023-06-28T13:06:00.622Z',
        updatedAt: '2023-06-28T13:06:00.622Z',
        id_equivalencia: 1,
      },
      {
        texto: 'Tu certificado es válido, en breve te enviaremos la resolución',
        id_remitente: 2,
        createdAt: '2023-06-28T13:07:00.622Z',
        updatedAt: '2023-06-28T13:07:00.622Z',
        id_equivalencia: 1,
      },
      {
        texto: 'Que tengas un buen día',
        id_remitente: 2,
        createdAt: '2023-06-28T13:07:30.622Z',
        updatedAt: '2023-06-28T13:07:30.622Z',
        id_equivalencia: 1,
      },
      {
        texto: 'No hay de qué, Anthony',
        id_remitente: 1,
        createdAt: '2023-06-28T16:45:00.622Z',
        updatedAt: '2023-06-28T16:45:00.622Z',
        id_equivalencia: 1,
      },
      {
        texto: 'Cualquier cosa que necesites, no dudes en escribirme. Saludos',
        id_remitente: 1,
        createdAt: '2023-06-28T16:45:50.622Z',
        updatedAt: '2023-06-28T16:45:50.622Z',
        id_equivalencia: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mensajes', null, {});
  }
};