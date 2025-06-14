import request from 'supertest';

const api = request('http://localhost:3001/api');

describe('MateriaSolicitada', () => {
  test('GET /materias_solicitadas', async () => {
    const response = await api.get('/materias_solicitadas');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            EquivalenciumId: expect.any(Number),
            createdAt: expect.any(String),
            id: expect.any(Number),
            id_carrera: expect.any(Number),
            nombre: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      })
    );
  });
});
