const request = require('supertest');
const app = require('./app.js');
const jwt = require('jsonwebtoken');

const secretKey = 'amongus';

test('GET / should return "Hello, world!"', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe('Hello panuvit');
});


describe('GET /generate/:name', () => {
  test('should return a JWT token', async () => {
    const response = await request(app).get('/generate/doggie');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBeDefined();

    const decoded = jwt.verify(response.text, secretKey);
    expect(decoded.name).toBe('doggie');
  });
});


describe('Middleware: verifyToken', () => {
  test('returns a 401 error if no Authorization header is present', async () => {
    const response = await request(app).get('/protected');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Missing Authorization header');
  });

  test('returns a 401 error if an invalid token is provided in the Authorization header', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid_token');
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Invalid token');
  });

  test('calls the next function if a valid token is provided in the Authorization header', async () => {
    const user = { name: 'Alice' };
    const token = jwt.sign(user, secretKey);
    const response = await request(app)
      .get('/protected')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(`Welcome, ${user.name}!`);
  });
});
