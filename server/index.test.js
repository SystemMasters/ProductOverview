const request = require('supertest');
const app = require('./index');

describe('Get request', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
  it('should return an object', async () => {
    const response = await request(app).get('/products?page=1&count=1');
    expect(typeof response).toBe('object');
  });
});
