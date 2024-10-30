require('dotenv').config();
import Carrera from '../models/carrera';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Carrera', () => {
  test('El modelo debe ser definido', () => {
    expect(Carrera).toBeDefined();
  });
});

describe('Endpoints GET de Carrera', () => {
  test('Debe retornar un lista completa con todas las carreras', async () => {
    const response = await api.get(`/api/carreras/todas`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body[0].nombre_carrera).toBe('Tecnicatura en informatica');
    expect(response.body[1].nombre_carrera).toBe('Profesorado de Ingles');
    expect(response.body[2].nombre_carrera).toBe('Lic. en Biotecnologia');
  });

  test('Debe retornar un array con todas las carreras y sus directivos', async () => {
    const response = await api.get(`/api/carreras/todasConDirectivos`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data[0].nombre_carrera).toBe(
      'Tecnicatura en informatica'
    );
    expect(response.body.data[0].directivos[0].nombre).toBe('Anthony ');
    expect(response.body.data[1].nombre_carrera).toBe('Profesorado de Ingles');
    expect(response.body.data[1].directivos[0].nombre).toBe('Anthony ');
    expect(response.body.data[3].nombre_carrera).toBe('Lic. en Biotecnologia');
    expect(response.body.data[3].directivos[0].nombre).toBe('Ana');
  });

  test('Debe retornar un array con todas las carreras sin directivos', async () => {
    const response = await api.get(`/api/carreras/`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data[0].nombre_carrera).toBe(
      'Tecnicatura en informatica'
    );
    expect(response.body.data[1].nombre_carrera).toBe('Profesorado de Ingles');
    expect(response.body.data[3].nombre_carrera).toBe('Lic. en Educacion');
  });

  test('Debe retornar los detalles de una carrera por su id', async () => {
    const response = await api.get(`/api/carreras/3`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.nombre_carrera).toBe('Lic. en Biotecnologia');
    expect(response.body.nombre_instituto).toBe('Instituto de Biología');
    expect(response.body.id).toBe(3);
  });
});

describe('Endpoints POST de Carrera', () => {
  test('Crear una nueva carrera y retornar status 201', async () => {
    // retorna 409 si lo corremos dos veces seguidas, porque la carrera ya estaria creada, recomiendo borrar la base manualmente para volver a probar
    const carreraTest = {
      nombre_carrera: 'Licenciatura en Matemática para Algoritmos',
      nombre_instituto: 'Facultad de Ciencias Exactas de Ushuaia',
      activo: 3,
    };
    const response = await api
      .post(`/api/carreras`)
      .send(carreraTest)
      .expect(201)
      .expect('Content-Type', /json/);

    //console.log(response.body)
    expect(response.body.nombre_carrera).toBe(carreraTest.nombre_carrera);
    expect(response.body.nombre_instituto).toBe(carreraTest.nombre_instituto);
  });

  test('Debe retornar un error 400 si faltan campos obligatorios', async () => {
    const carreraIncompleta = { nombre_carrera: 'Lic. en Física' };

    const response = await api
      .post('/api/carreras')
      .send(carreraIncompleta)
      .expect(400);

    expect(response.body.error).toContain('Faltan campos obligatorios');
  });

  test('Debe retornar un error 409 si la carrera ya existe', async () => {
    const carreraExistente = {
      nombre_carrera: 'Tecnicatura en informatica',
      nombre_instituto: 'Instituto de Informática',
      activo: 1,
    };

    await api.post('/api/carreras').send(carreraExistente).expect(409);
  });
});
