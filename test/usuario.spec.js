import request from 'supertest';

const api = request('http://localhost:3001/api');

describe('Usuario', () => {
  test('GET /usuarios', async () => {
    const response = await api.get('/usuarios');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            apellido: expect.any(String),
            createdAt: expect.any(String),
            discord: expect.any(String),
            dni: expect.any(Number),
            email: expect.any(String),
            id: expect.any(Number),
            nombre: expect.any(String),
            password: expect.any(String),
            rol: expect.any(String),
            telefono: expect.any(Number),
            updatedAt: expect.any(String),
          }),
        ]),
      })
    );
  });
});
