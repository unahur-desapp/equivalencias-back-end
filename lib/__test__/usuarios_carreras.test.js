require('dotenv').config();
import Usuarios_carreras from '../models/usuarios_carreras';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Usuarios_carreras', () => {
  test('El modelo debe ser definido', () => {
    expect(Usuarios_carreras).toBeDefined();
  });
});

describe('Endpoints GET de Usuarios_carreras', () => {
  test('Debe retornar un array con todos los directivos y sus carreras desplegadas', async () => {
    const response = await api.get(`/api/usuarios_carreras/directivo/2`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body[0].UsuarioId).toBe(2);
    expect(response.body[0].Carrera.nombre_carrera).toBe("Tecnicatura en informatica");
    expect(response.body[1].UsuarioId).toBe(2);
    expect(response.body[1].Carrera.nombre_carrera).toBe("Lic. en Educacion");
  });

  test('Debe retornar un array con todas las relaciones y sus carreras desplegadas', async () => {
    const response = await api.get(`/api/usuarios_carreras/superusuario`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body[0].UsuarioId).toBe(2);
    expect(response.body[0].Carrera.nombre_carrera).toBe("Tecnicatura en informatica");
    expect(response.body[1].UsuarioId).toBe(2);
    expect(response.body[1].Carrera.nombre_carrera).toBe("Profesorado de Ingles");
    expect(response.body[2].UsuarioId).toBe(2);
    expect(response.body[2].Carrera.nombre_carrera).toBe("Lic. en Educacion");
    expect(response.body[3].UsuarioId).toBe(6);
    expect(response.body[3].Carrera.nombre_carrera).toBe("Lic. en Biotecnologia");
    expect(response.body[4].UsuarioId).toBe(6);
    expect(response.body[4].Carrera.nombre_carrera).toBe("Tec. en Metalurgica");
  });

  test('Debe retornar un array con todas las relaciones', async () => {
    const response = await api.get(`/api/usuarios_carreras/todas`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body[0].UsuarioId).toBe(2);
    expect(response.body[0].CarreraId).toBe(1);
    expect(response.body[1].UsuarioId).toBe(2);
    expect(response.body[1].CarreraId).toBe(2);
    expect(response.body[2].UsuarioId).toBe(2);
    expect(response.body[2].CarreraId).toBe(4);
    expect(response.body[3].UsuarioId).toBe(6);
    expect(response.body[3].CarreraId).toBe(3);
    expect(response.body[4].UsuarioId).toBe(6);
    expect(response.body[4].CarreraId).toBe(5);
  });

  test('Debe retornar un array con todas las relaciones', async () => {
    const response = await api.get(`/api/usuarios_carreras/2`);

    expect(response.status).toBe(200);
    expect(response.body[0].Carrera.nombre_carrera).toBe("Tecnicatura en informatica");
    expect(response.body[0].Usuario.nombre).toBe("Anthony ");
    expect(response.body[0].Usuario.rol).toBe("directivo");
  });
});
