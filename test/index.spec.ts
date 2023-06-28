import request from 'supertest';
import app from './server.spec';
import { describe } from 'node:test';
import { expect, beforeAll, afterAll, it } from '@jest/globals';

describe('Server', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001, () => {
      console.log('Listening on localhost:3001');
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should respond with 200 OK when hitting a route', async () => {
    const response = await request(server).get('/some-route');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Success' });
  });

  it('should handle POST requests', async () => {
    const response = await request(server).post('/another-route').send({ data: 'example' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Data received' });
  });
});
