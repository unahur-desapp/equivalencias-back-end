require('dotenv').config();
import Reset from '../models/reset';

const supertest = require('supertest');
const app = require('../app.js');

<<<<<<< HEAD
=======
const api = supertest(app);
>>>>>>> test_back

describe('Pruebas de Modelo Reset', () => {
  test('El modelo debe ser definido', () => {
    expect(Reset).toBeDefined();
  });
});

<<<<<<< HEAD
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
=======
//El reset solo tiene post
/*describe('Endpoints GET de Reset', () => {
  test('Debe retornar un array con todos los mensajes respecto a una equivalencia', async () => {
    const response = await api.get(`/api/mensajes/1`);

    //console.log(response.body)
    expect(response.status).toBe(200);
  });
});*/
>>>>>>> test_back
