import request from 'supertest';

const api = request('http://localhost:3001/api');

describe('Equivalencia', () => {
  test('GET /equivalencias/general', async () => {
    const response = await api.get('/equivalencias/general');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({
            Materias_aprobadas: expect.arrayContaining([
              expect.objectContaining({
                EquivalenciumId: expect.any(Number),
                UniversidadOrigenId: expect.any(Number),
                año_aprobacion: expect.any(String),
                carga_horaria: expect.any(Number),
                certificado: expect.any(Boolean),
                createdAt: expect.any(String),
                id: expect.any(Number),
                nombre_materia: expect.any(String),
                nota: expect.any(Number),
                updatedAt: expect.any(String),
              }),
            ]),
          }),
        ],
        expect.objectContaining({
          Usuario: expect.arrayContaining([
            expect.objectContaining({
              apellido: expect.any(String),
              createdAt: expect.any(String),
              email: expect.any(String),
              id: expect.any(Number),
              nombre: expect.any(String),
              updatedAt: expect.any(String),
              usuario: expect.any(String),
            }),
          ]),
        })
      )
    );
  });
});
