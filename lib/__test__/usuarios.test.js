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
    expect(response.body[0].nombre).toBe("Enzo")
  });

  test('Debe retornar un array de todos los usuarios', async () => {
    const response = await api.get(`/api/usuarios/`);
    
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(8);
    expect(response.body.data[0].nombre).toBe("Enzo")
  });

  test('Debe retornar el usuario de un id especifico', async () => {
    const response = await api.get(`/api/usuarios/3`);

    //console.log(response)
    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe("Liam");
    expect(response.body.id).toBe(3)
  });

  test('Debe retornar el usuario de un id determinado', async () => {
    const response = await api.get(`/api/usuarios/completo/3`);

    //console.log(response)
    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe("Liam");
    expect(response.body.id).toBe(3)
  });

  test('Debe retornar todos los usuarios directivos', async () => {
    const response = await api.get(`/api/usuarios/directivos/todos`);

    //console.log(response)
    expect(response.status).toBe(200);
    expect(response.body[0].rol).toBe("directivo");
    expect(response.body[0].nombre).toBe("Anthony ")
  });

  test('Debe retornar el estado de un determinado dni', async () => {
    const response = await api.get(`/api/usuarios/getEstadoByDni/30563652`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.estado).toBe("Habilitado");
  });

  test('Debe retornar el usuario con determinado dni', async () => {
    const response = await api.get(`/api/usuarios/dni/30563652`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.rol).toBe("alumno");
  });

  test('Debe retornar los datos de login con determinado dni', async () => {
    const response = await api.get(`/api/usuarios/login/30563652`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Usuario con DNI 30563652, encontrado");
  });

});