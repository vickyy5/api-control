import request from 'supertest';
import app from '../src/server'; // Ruta al archivo principal de la aplicación Express
import { beforeAll, afterAll, expect } from '@jest/globals';
import { describe, it } from 'node:test';

let server;

beforeAll(() => {
  server = app.listen(3001, () => {
    console.log('Listening on localhost:3001');
  });
});

afterAll((done) => {
  server.close(done);
});

describe('App', () => {
  it('should create a new user', async () => {
    const response = await request(server).post('/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User created successfully' });
  });

  it('should respond with pong', async () => {
    const response = await request(server).get('/ping');

    expect(response.status).toBe(200);
    expect(response.text).toBe('pong');
  });

  it('should require authentication for /api routes', async () => {
    const response = await request(server).get('/api/some-route');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Unauthorized' });
  });

  it('should allow login', async () => {
    const response = await request(server)
      .post('/login')
      .send({ username: 'john', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Login successful' });
  });
});
