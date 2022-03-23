import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('Test endpoint without filename', async () => {
        const response = await request.get('/api/images').expect(400);
    })
});
