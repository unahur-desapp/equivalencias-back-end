require('dotenv').config();
import Reset from '../models/reset';

const supertest = require('supertest');
const app = require('../app.js');


describe('Pruebas de Modelo Reset', () => {
  test('El modelo debe ser definido', () => {
    expect(Reset).toBeDefined();
  });
});

//El reset solo tiene 
// en algun momento habra que crear const api = supertest(app);
//describe('Endpoints GET de Reset', () => {
//  test('Debe retornar un array con todos los mensajes respecto a una equivalencia', async () => {
//    const response = await api.get(`/api/mensajes/1`);
//
    //console.log(response.body)
//    expect(response.status).toBe(200);
//  });
//});*/