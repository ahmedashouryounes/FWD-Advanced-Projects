import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('Test endpoint without filename', async () => {
    await request.get('/api/images').expect(400);
  });
  it('Test endpoint without width', async () => {
    await request.get('/api/images?fjord').expect(400);
  });
  it('Test endpoint without height', async () => {
    await request.get('/api/images?fjord&width=200').expect(400);
  });
  it('Test endpoint with name of image not exist', async () => {
    await request.get('/api/images?sfas&width=200&height=500').expect(400);
  });

});
