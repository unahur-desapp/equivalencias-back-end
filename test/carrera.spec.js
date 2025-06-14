import request from 'supertest';

const api = request('http://localhost:3001/api');

describe('Carrera', () => {
  let id = 0;
  test('GET /carrera', async () => {
    const response = await api.get('/carreras');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.any(String),
            id: expect.any(Number),
            nombre_carrera: expect.any(String),
            nombre_instituto: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      })
    );
  });
  test('POST /carrera', async () => {
    const response = await api.post('/carreras').send({
      nombre_carrera: 'Ingenieria en Sistemas',
      nombre_instituto: 'Instituto Tecnologico de Tijuana',
    });
    expect(response.status).toBe(200);
    //set id for next test
    id = response.body.data.id;
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          nombre_carrera: expect.any(String),
          nombre_instituto: expect.any(String),
          updatedAt: expect.any(String),
        }),
      })
    );
  });
  test('PUT /carrera/:id', async () => {
    const response = await api.put('/carreras/' + id).send({
      nombre_carrera: 'Ingenieria en Sistemas Computacionales',
      nombre_instituto: 'Instituto Tecnologico de Tijuana',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          nombre_carrera: expect.any(String),
          nombre_instituto: expect.any(String),
          updatedAt: expect.any(String),
        }),
      })
    );
  });
  test('DELETE /carrera/:id', async () => {
    const response = await api.delete('/carreras/' + id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: expect.objectContaining({
          createdAt: expect.any(String),
          id: expect.any(Number),
          nombre_carrera: expect.any(String),
          nombre_instituto: expect.any(String),
          updatedAt: expect.any(String),
        }),
      })
    );
  });
});
