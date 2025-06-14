import request from 'supertest';

const api = request('http://localhost:3001/api');

describe('UniversidadOrigen', () => {
  test('GET /universidades_origen', async () => {
    const response = await api.get('/universidades_origen');
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: `No hay materias aprobadas`,
      })
    );
  });
});
