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
    expect(response.body[0].nombre_carrera).toBe("Tecnicatura en informatica");
    expect(response.body[1].nombre_carrera).toBe("Profesorado de Ingles");
    expect(response.body[2].nombre_carrera).toBe("Lic. en Biotecnologia");
  });

  test('Debe retornar un array con todas las carreras y sus directivos', async () => {
    const response = await api.get(`/api/carreras/todasConDirectivos`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data[0].nombre_carrera).toBe("Tecnicatura en informatica");
    expect(response.body.data[0].directivos[0].nombre).toBe("Anthony ");
    expect(response.body.data[1].nombre_carrera).toBe("Profesorado de Ingles");
    expect(response.body.data[1].directivos[0].nombre).toBe("Anthony ");
    expect(response.body.data[3].nombre_carrera).toBe("Lic. en Biotecnologia");
    expect(response.body.data[3].directivos[0].nombre).toBe("Ana");
  });

  test('Debe retornar un array con todas las carreras sin directivos', async () => {
    const response = await api.get(`/api/carreras/`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data[0].nombre_carrera).toBe("Tecnicatura en informatica");
    expect(response.body.data[1].nombre_carrera).toBe("Profesorado de Ingles");
    expect(response.body.data[3].nombre_carrera).toBe("Lic. en Educacion");
  });

  test('Debe retornar los detalles de una carrera por su id', async () => {
    const response = await api.get(`/api/carreras/3`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.nombre_carrera).toBe("Lic. en Biotecnologia");
    expect(response.body.nombre_instituto).toBe("Instituto de Biología");
    expect(response.body.id).toBe(3);    
  });
});