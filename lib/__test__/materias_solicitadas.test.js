require('dotenv').config();
import Materia_solicitada from '../models/materia_solicitada';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Materia_solicitada', () => {
  test('El modelo debe ser definido', () => {
    expect(Materia_solicitada).toBeDefined();
  });
});

describe('Endpoints GET de Materia_solicitada', () => {
  test('Debe retornar un array con todas las materias solicitadas', async () => {
    const response = await api.get(`/api/materias_solicitadas/`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data[0].nombre).toBe("Introducción a la Programación");
    expect(response.body.data[1].nombre).toBe("Gramatica 1");
    expect(response.body.data[2].nombre).toBe("Biologia General");
    expect(response.body.data[3].nombre).toBe("Pedagogía I");
    expect(response.body.data[4].nombre).toBe("Metalurgia l");
  });

  test('Debe retornar un materias solicitada dado un id', async () => {
    const response = await api.get(`/api/materias_solicitadas/2`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data.nombre).toBe("Gramatica 1");
    expect(response.body.data.carrera).toBe("Profesorado de Ingles");
  });
});