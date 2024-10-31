require('dotenv').config();
import Usuario from '../models/usuario';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Usuario', () => {
  test('El modelo debe ser definido', () => {
    expect(Usuario).toBeDefined();
  });
});

describe('Endpoints GET de Usuarios', () => {
  test('Debe retornar una lista de todos los usuarios', async () => {
    const response = await api.get(`/api/usuarios/todos`);

    //console.log(response)
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(8);
    expect(response.body[0].nombre).toBe('Enzo');
  });

  test('Debe retornar un array de todos los usuarios', async () => {
    const response = await api.get(`/api/usuarios/`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(8);
    expect(response.body.data[0].nombre).toBe('Anthony ');
  });

  test('Debe retornar el usuario de un id especifico', async () => {
    const response = await api.get(`/api/usuarios/3`);

    //console.log(response)
    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe('Liam');
    expect(response.body.id).toBe(3);
  });

  test('Debe retornar el usuario de un id determinado', async () => {
    const response = await api.get(`/api/usuarios/completo/3`);

    //console.log(response)
    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe('Liam');
    expect(response.body.id).toBe(3);
  });

  test('Debe retornar todos los usuarios directivos', async () => {
    const response = await api.get(`/api/usuarios/directivos/todos`);

    //console.log(response)
    expect(response.status).toBe(200);
    expect(response.body[0].rol).toBe('directivo');
    expect(response.body[0].nombre).toBe('Anthony ');
  });

  test('Debe retornar el estado de un determinado dni', async () => {
    const response = await api.get(`/api/usuarios/getEstadoByDni/30563652`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.estado).toBe('Habilitado');
  });

  test('Debe retornar el usuario con determinado dni', async () => {
    const response = await api.get(`/api/usuarios/dni/30563652`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.rol).toBe('alumno');
  });

  test('Debe retornar los datos de login con determinado dni', async () => {
    const response = await api.get(`/api/usuarios/login/30563652`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuario con DNI 30563652, encontrado');
  });
});

describe('Endpoints POST de Usuarios', () => {
  test('Crear un nuevo usuario y retornar status 201', async () => { // Fijarse que carlos no este en la base equivalencias_test antes de correr, sino dara error
    const nuevoUsuario = {
    dni: '12345678',
    nombre: 'Carlos',
    apellido: 'Perez',
    email: 'carlos.perez@ejemplo.com',
    discord: 'Carlos#1234',
    telefono: '123456789',
    rol: 'alumno',
    password: 'contraseña123',
    estado: 'Habilitado',
    };
    const response = await api
    .post(`/api/usuarios`)
    .send(nuevoUsuario)
    .expect(201)
    .expect('Content-Type', /json/);
    
    expect(response.body.nombre).toBe('Carlos');
    expect(response.body.dni).toBe(12345678);
    });

    test('Debe retornar un error 400 si faltan campos obligatorios', async () => {
      const usuarioIncompleto = {
      nombre: 'Laura',
      // Ingresamos cualquier dato, pero debe estar incompleto
      };
      
      const response = await api
      .post('/api/usuarios')
      .send(usuarioIncompleto)
      .expect(400);
      
      expect(response.body.error).toContain('Faltan campos obligatorios');
      });

      test('Crear un usuario existente y retornar 409', async () => {
        const nuevoUsuario = {
        dni: '30563652',
        nombre: 'Enzo',
        apellido: 'Fernandez',
        email: 'enzofernandezunahur@gmail.com',
        discord: '@enzoF',
        telefono: '44595568',
        rol: 'alumno',
        password: 'prueba',
        estado: 'Habilitado',
        };
        const response = await api
        .post(`/api/usuarios`)
        .send(nuevoUsuario)
        .expect(409)
        .expect('Content-Type', /json/);
        console.log(response.body);
        expect(response.body.nombre).toBe('Enzo');
        expect(response.body.dni).toBe(30563652);
        });
});


