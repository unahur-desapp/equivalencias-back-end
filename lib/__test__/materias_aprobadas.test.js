require('dotenv').config();
import Materia_aprobada from '../models/materia_aprobada';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Materia_aprobada', () => {
  test('El modelo debe ser definido', () => {
    expect(Materia_aprobada).toBeDefined();
  });
});

describe('Endpoints GET de Materias aprobadas', () => {
  test('Debe retornar la cantidad de materias aprobadas', async () => {
    const response = await api.get(`/api/materias_aprobadas/`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(5);
  });

  test('Debe retornar el nombre de la materia aprobada con ID', async () => {
    const response = await api.get('/api/materias_aprobadas/2');
    
    expect(response.status).toBe(200);
    expect(response.body.data.nombre_materia).toBe("Programacion 1");
  });

  test('Debe retornar la cantidad de materias aprobadas de una universidad por id', async () => {
    const response = await api.get('/api/materias_aprobadas/universidad/2');
    
    //console.log(response.body)

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].UniversidadOrigenId).toBe(2)
  });
});

