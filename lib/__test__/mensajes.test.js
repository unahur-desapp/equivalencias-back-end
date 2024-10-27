require('dotenv').config();
import Mensajes from '../models/mensajes';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Mensajes', () => {
  test('El modelo debe ser definido', () => {
    expect(Mensajes).toBeDefined();
  });
});

describe('Endpoints GET de Mensajes', () => {
  test('Debe retornar un array con todos los mensajes respecto a una equivalencia', async () => {
    const response = await api.get(`/api/mensajes/1`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body[0].texto).toBe("Hola, Enzo Fernandez ¿cómo estás?");
    expect(response.body[0].Equivalencium.estado).toBe("aceptado");
    expect(response.body[1].texto).toBe("Te hablo por tu solicitud de equivalencia en la materia Introducción a la Programación");
  });
});