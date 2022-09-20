import supertest from 'supertest'
import app from '../server'

const testServer = supertest(app);

describe ('Test endpoint responses', () => {
    it('get the home endpoint', async () => {
        const response = await testServer.get('/');
        expect(response.status).toBe(200);
        
    })
})