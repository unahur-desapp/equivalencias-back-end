require('dotenv').config();
import Equivalencia from '../models/equivalencia';

const supertest = require('supertest');
const app = require('../app.js');

const api = supertest(app);

describe('Pruebas de Modelo Equivalencia', () => {
  test('El modelo debe ser definido', () => {
    expect(Equivalencia).toBeDefined();
  });
});

describe('Endpoints GET de Equivalencias', () => {
  test('Debe retornar un array de todas las equivalencias solicitadas', async () => {
    const response = await api.get(`/api/equivalencias/solicitada`);

    //console.log(response.body[0].Materia_solicitadas)
    expect(response.status).toBe(200);
    expect(response.body[0].estado).toBe("aceptado");
    expect(response.body[0].Materia_solicitadas[0].nombre).toBe("Introducción a la Programación")
  });

  test('Debe retornar una equivalencia solicitada determinada por el numero de id', async () => {
    const response = await api.get(`/api/equivalencias/solicitada/1`);

    //console.log(response.body.id)
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.Materia_solicitadas[0].nombre).toBe("Introducción a la Programación")
  });

  test('Debe retornar un array de todas las equivalencias aprobadas', async () => {
    const response = await api.get(`/api/equivalencias/aprobada`);

    //console.log(response.body.Materia_aprobadas)
    expect(response.status).toBe(200);
    expect(response.body[0].estado).toBe("aceptado");
    expect(response.body[0].Materia_aprobadas[0].nombre_materia).toBe("Gramática I")
  });

  test('Debe retornar una equivalencia aprobada por id', async () => {
    const response = await api.get(`/api/equivalencias/aprobada/1`);

    //console.log(response.body.Materia_aprobadas)
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.Materia_aprobadas[0].nombre_materia).toBe("Gramática I")
  });

  test('Debe retornar un listado de equivalencias, materias solicitadas y datos de usuarios', async () => {
    const response = await api.get(`/api/equivalencias/general`);

    //console.log(response.body.Materia_aprobadas)
    expect(response.status).toBe(200);
    
    //Verifica datos de la equivalencia
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].instituto).toBe("ninguno");
    expect(response.body[0].estado).toBe("aceptado");
    expect(response.body[0].observaciones).toBe("falta dni");

    //Materia solicitada
    expect(response.body[0].Materia_solicitadas[0].id).toBe(1);
    expect(response.body[0].Materia_solicitadas[0].nombre).toBe("Introducción a la Programación");
    expect(response.body[0].Materia_solicitadas[0].estado).toBe("pendiente");
    
    //Materia aprobada
    expect(response.body[0].Materia_aprobadas[0].id).toBe(1);
    expect(response.body[0].Materia_aprobadas[0].nota).toBe(7);
    expect(response.body[0].Materia_aprobadas[0].nombre_materia).toBe("Gramática I");
    expect(response.body[0].Materia_aprobadas[0].certificado).toBe(true);
        
    //Usuario
    expect(response.body[0].Usuario.dni).toBe(30563652);
    expect(response.body[0].Usuario.nombre).toBe("Enzo");
    expect(response.body[0].Usuario.apellido).toBe("Fernandez");
  });

  test('Debe retornar una equivalencia dado su id con materias solicitadas y datos de usuarios', async () => {
    const response = await api.get(`/api/equivalencias/general/1`);

    //console.log(response.body.Materia_aprobadas)
    expect(response.status).toBe(200);
    
    //Verifica datos de la equivalencia
    expect(response.body.id).toBe(1);
    expect(response.body.instituto).toBe("ninguno");
    expect(response.body.estado).toBe("aceptado");
    expect(response.body.observaciones).toBe("falta dni");

    //Materia solicitada
    expect(response.body.Materia_solicitadas[0].id).toBe(1);
    expect(response.body.Materia_solicitadas[0].nombre).toBe("Introducción a la Programación");
    expect(response.body.Materia_solicitadas[0].estado).toBe("pendiente");
    
    //Materia aprobada
    expect(response.body.Materia_aprobadas[0].id).toBe(1);
    expect(response.body.Materia_aprobadas[0].nota).toBe(7);
    expect(response.body.Materia_aprobadas[0].nombre_materia).toBe("Gramática I");
    expect(response.body.Materia_aprobadas[0].certificado).toBe(true);
        
    //Usuario
    expect(response.body.Usuario.dni).toBe(30563652);
    expect(response.body.Usuario.nombre).toBe("Enzo");
    expect(response.body.Usuario.apellido).toBe("Fernandez");
  });

  test('Debe retornar un listado de equivalencias vinculadas a un usuario, con datos de equivalencia y usuario', async () => {
    const response = await api.get(`/api/equivalencias/generalUsuario/1`);

    //console.log(response.body.Materia_aprobadas)
    expect(response.status).toBe(200);
    
    //Verifica datos de la equivalencia
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].instituto).toBe("ninguno");
    expect(response.body[0].estado).toBe("aceptado");
    expect(response.body[0].observaciones).toBe("falta dni");

    //Materia solicitada
    expect(response.body[0].Materia_solicitadas[0].id).toBe(1);
    expect(response.body[0].Materia_solicitadas[0].nombre).toBe("Introducción a la Programación");
    expect(response.body[0].Materia_solicitadas[0].estado).toBe("pendiente");
    
    //Materia aprobada
    expect(response.body[0].Materia_aprobadas[0].id).toBe(1);
    expect(response.body[0].Materia_aprobadas[0].nota).toBe(7);
    expect(response.body[0].Materia_aprobadas[0].nombre_materia).toBe("Gramática I");
    expect(response.body[0].Materia_aprobadas[0].certificado).toBe(true);
        
    //Usuario
    expect(response.body[0].Usuario.dni).toBe(30563652);
    expect(response.body[0].Usuario.nombre).toBe("Enzo");
    expect(response.body[0].Usuario.apellido).toBe("Fernandez");
  });

  test('Debe retornar una lista con todas las equivalencias', async () => {
    const response = await api.get(`/api/equivalencias/`);

    //console.log(response.body.Materia_aprobadas)
    expect(response.status).toBe(200);
    expect(response.body.data[0].id).toBe(1);
    expect(response.body.data[0].estado).toBe("aceptado");
    expect(response.body.data[0].instituto).toBe("ninguno");
    expect(response.body.data[0].observaciones).toBe("falta dni");
  });

  test('Debe retornar una equivalencia dado un id', async () => {
    const response = await api.get(`/api/equivalencias/1`);

    //console.log(response.body.Materia_aprobadas)
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(1);
    expect(response.body.data.estado).toBe("aceptado");
    expect(response.body.data.instituto).toBe("ninguno");
    expect(response.body.data.observaciones).toBe("falta dni");
  });

});