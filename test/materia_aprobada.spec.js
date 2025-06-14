import request from 'supertest';

const api = request('http://localhost:3001/api');

describe('MateriaAprobada', () => {
  test('GET /materias_aprobadas', async () => {
    const response = await api.get('/materias_aprobadas');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
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
      })
    );
  });
});
