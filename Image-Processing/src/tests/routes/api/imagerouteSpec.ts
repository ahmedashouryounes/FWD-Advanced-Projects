import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('Test endpoint with name of image not exist', async () => {
    await request.get('/api/images?sfas&width=200&height=500').expect(400);
  });
});
