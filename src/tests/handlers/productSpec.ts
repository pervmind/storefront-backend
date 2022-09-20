import supertest from 'supertest'
import app from '../../server';
import products_routes from '../../handlers/product';

app.use(products_routes)
const testServer = supertest(app);

describe ('Test product handler endpoint responses', () => {
    it('get the product index endpoint should return 200', async () => {
        const response = await testServer.get('/products');
        expect(response.status).toBe(200);
        
    })
    it ('get the product show endpoint should return 200', async () => {
        const response = await testServer.get('/products/1');
        expect(response.status).toBe(200);
    })
    it ('post the product create endpoint should return 401', async ()=>{
        const response = await testServer.post('/products');
        expect(response.status).toBe(401);
    })
})