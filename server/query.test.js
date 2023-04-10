const request = require('supertest');
const app = require('./app.js');
const jwt = require('jsonwebtoken');

const secretKey = 'amongus';

test('GET / should return "Hello, world!"', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe('Hello panuvit');
});