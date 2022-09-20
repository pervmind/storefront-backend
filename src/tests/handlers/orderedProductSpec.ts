import supertest from 'supertest'
import app from '../../server';
import dashboard_routes from '../../handlers/orderedProduct';

app.use(dashboard_routes)
const testServer = supertest(app);

describe ('Test dashboard handler endpoint responses', () => {
    it('get the ordered products endpoint should return 401', async () => {
        const response = await testServer.get('/orders/:id/products');
        expect(response.status).toBe(401);
        
    })
    it ('get the show products endpoint should return 401', async () => {
        const response = await testServer.post('/orders/:id/products');
        expect(response.status).toBe(401);
    })
})