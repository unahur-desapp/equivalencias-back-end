'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      {
        dni: 30563652,
        nombre: 'Enzo',
        apellido: 'Fernandez',
        email: 'enzofernandezunahur@gmail.com',
        discord: '@enzoF',
        telefono: 44595568,
        rol: 'alumno',
        password:
          '$2a$10$M4dYt2R7CPZ/q0Gtttpo7OGw5YJhDQvi6q8khqNQSP.jUocR83aCK', // prueba
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Habilitado',
      },

      {
        dni: 20569859,
        nombre: 'Anthony ',
        apellido: 'kiedis',
        email: 'RHCP@gmail.com',
        discord: '@Anthony55',
        telefono: 1523698547,
        rol: 'directivo',
        password:
          '$2a$10$r6SlkIBD22flPu5Ib4sqzeMji9yNrzWEyVLuGrvUb8G2LDC.bC//W', // 12345
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Habilitado',
      },

      {
        dni: 35025698,
        nombre: 'Liam',
        apellido: 'Gallagher',
        email: 'Liam595@hotmail.com',
        discord: 'Liam99',
        telefono: 1123968547,
        rol: 'alumno',
        password:
          '$2a$10$S5EG.o3lmKwf7kKfaWT0AOU6bPdq2LzXAOL5NlvT/gIKpOOAHb4nK', //monumental
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Habilitado',
      },
      {
        dni: 35563675,
        nombre: 'Carlos',
        apellido: 'Rey',
        email: 'carlos@gmail.com',
        discord: '@CAR595',
        telefono: 1190595568,
        rol: 'alumno',
        password:
          '$2a$10$ZTTxZyLvt/F93BwPs/M1vOYvChNeOd/0YxZKGxwCkpb8Q78edm4dC', // milan
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Habilitado',
      },
      {
        dni: 35563652,
        nombre: 'Paula',
        apellido: 'Rey',
        email: 'pauli@gmail.com',
        discord: '@Paula595',
        telefono: 1190595568,
        rol: 'alumno',
        password:
          '$2a$10$GokC4Ped877ec6VqbXJObeD5gbfj.FMFtIYpL.V7UtMzcBZ2VoAmW', // 5959
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Habilitado',
      },

      {
        dni: 25569598,
        nombre: 'Ana',
        apellido: 'Gonzalez',
        email: 'AnaGon@yahoo.com.ar',
        discord: '@estrella59',
        telefono: 1123708547,
        rol: 'directivo',
        password:
          '$2a$10$qexg1PA7.ftsJhjooL05gusHAe2in.5dgh6J0LmY3s6Sj1Dc1nanK', // unahur
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Habilitado',
      },

      {
        dni: 29025755,
        nombre: 'Peter',
        apellido: 'Parker',
        email: 'Spider@hotmail.com',
        discord: '@laAraña',
        telefono: 1123968889,
        rol: 'alumno',
        password:
          '$2a$10$inDbJETIz.TPr94Nm.ji1OdG3VthyTeh2bJQqufPFUA/LTxJPxBGi', // 1525gty
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Deshabilitado',
      },
      {
        dni: 26777239,
        nombre: 'Super',
        apellido: 'Usuario',
        email: 'equivalenciasunahuruniversidad@gmail.com',
        discord: '@superusuariounahur',
        telefono: 1123708547,
        rol: 'superusuario',
        password:
          '$2a$10$qexg1PA7.ftsJhjooL05gusHAe2in.5dgh6J0LmY3s6Sj1Dc1nanK', // unahur
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: 'Habilitado',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  },
};
