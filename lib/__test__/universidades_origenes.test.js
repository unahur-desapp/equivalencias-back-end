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
    expect(response.body.items[0].nombre_universidad).toBe("Universidad Tecnológica Nacional");
    expect(response.body.items[1].sigla).toBe("UBA");
    expect(response.body.items[2].sigla).toBe("UNLaM");
    expect(response.body.items[3].sigla).toBe("UNSAM");
    expect(response.body.items[4].sigla).toBe("UNLP");
  });

  test('Debe retornar un array con todas las universidades de origen', async () => {
    const response = await api.get(`/api/universidades_origenes/todas/enabled`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body[0].nombre_universidad).toBe("Universidad Tecnológica Nacional");
    expect(response.body[1].sigla).toBe("UBA");
    expect(response.body[2].sigla).toBe("UNLaM");
    expect(response.body[3].sigla).toBe("UNSAM");
    expect(response.body[4].sigla).toBe("UNLP");
  });

  
  test('Debe retornar un array con todas las universidades', async () => {
    const response = await api.get(`/api/universidades_origenes/`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.data[0].nombre_universidad).toBe("Universidad Tecnológica Nacional");
    expect(response.body.data[1].sigla).toBe("UBA");
    expect(response.body.data[2].sigla).toBe("UNLaM");
    expect(response.body.data[3].sigla).toBe("UNSAM");
    expect(response.body.data[4].sigla).toBe("UNLP");
  });

  test('Debe retornar una universidad de origen dado un id', async () => {
    const response = await api.get(`/api/universidades_origenes/2`);

    //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.sigla).toBe("UBA");
    expect(response.body.localidad).toBe("CABA");
    expect(response.body.Materia_aprobadas[0].nombre_materia).toBe("Programacion 1");
  });
});