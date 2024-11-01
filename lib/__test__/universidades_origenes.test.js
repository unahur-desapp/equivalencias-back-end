require('dotenv').config();
import Universidad_origen from '../models/universidad_origen';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Universidad_origen', () => {
  test('El modelo debe ser definido', () => {
    expect(Universidad_origen).toBeDefined();
  });
});

describe('Endpoints GET de Universidad_origen', () => {
  test('Debe retornar un elemento con todas las universidades de origen', async () => {
    const response = await api.get(`/api/universidades_origenes/todas`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.items[0].nombre_universidad).toBe(
      'Universidad Tecnológica Nacional'
    );
    expect(response.body.items[1].sigla).toBe('UBA');
    expect(response.body.items[2].sigla).toBe('UNLaM');
    expect(response.body.items[3].sigla).toBe('UNSAM');
    expect(response.body.items[4].sigla).toBe('UNLP');
  });

  test('Debe retornar un array con todas las universidades de origen', async () => {
    const response = await api.get(`/api/universidades_origenes/todas/enabled`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body[0].nombre_universidad).toBe(
      'Universidad de Buenos Aires'
    );
    expect(response.body[4].sigla).toBe('UBA');
    expect(response.body[1].sigla).toBe('UNLaM');
    expect(response.body[2].sigla).toBe('UNSAM');
    expect(response.body[3].sigla).toBe('UNLP');
  });

  test('Debe retornar un array con todas las universidades', async () => {
    const response = await api.get(`/api/universidades_origenes/`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data[0].nombre_universidad).toBe(
      'Universidad de Buenos Aires'
    );
    expect(response.body.data[4].sigla).toBe('UBA');
    expect(response.body.data[1].sigla).toBe('UNLaM');
    expect(response.body.data[2].sigla).toBe('UNSAM');
    expect(response.body.data[3].sigla).toBe('UNLP');
  });

  test('Debe retornar una universidad de origen dado un id', async () => {
    const response = await api.get(`/api/universidades_origenes/2`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.sigla).toBe('UBA');
    expect(response.body.localidad).toBe('CABA');
    expect(response.body.Materia_aprobadas[0].nombre_materia).toBe(
      'Programacion 1'
    );
  });
});

describe('Endpoints POST de Universidades de Origen', () => {
  test('Crear una nueva universidad y retornar status 201', async () => {
    const nuevaUniversidad = {
      nombre_universidad: 'Universidad de prueba',
      localidad: 'Test-Landia',
      sigla: 'TL',
    };

    const response = await api
      .post('/api/universidades_origen')
      .send(nuevaUniversidad)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body.nombre_universidad).toBe(nuevaUniversidad.nombre_universidad);
    expect(response.body.localidad).toBe(nuevaUniversidad.localidad);
    expect(response.body.sigla).toBe(nuevaUniversidad.sigla);
  });

  test('Debe retornar un error 400 si faltan campos obligatorios', async () => {
    const universidadIncompleta = {
      nombre_universidad: 'Universidad Incompleta',
    };

    const response = await api
      .post('/api/universidades_origen')
      .send(universidadIncompleta)
      .expect(400);

    expect(response.body.error).toContain('Faltan campos obligatorios');
  });

  test('Crear una universidad existente y retornar 409', async () => {
    const universidadExistente = {
      nombre_universidad: 'Universidad de prueba',
      localidad: 'Test-Landia',
      sigla: 'TL',
    };

    const response = await api
      .post('/api/universidades_origen')
      .send(universidadExistente)
      .expect(409)
      .expect('Content-Type', /json/);

    expect(response.body.error).toBe('La universidad ya existe');
  });
});