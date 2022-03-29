import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('Test / endpoint', async () => {
    await request.get('/').expect(200);
  });
});
