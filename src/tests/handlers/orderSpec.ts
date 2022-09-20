import supertest from 'supertest'
import app from '../../server';
import orders_routes from '../../handlers/order';

app.use(orders_routes)
const testServer = supertest(app);

describe ('Test order handler endpoint responses', () => {
    it('get the order index endpoint should return 200', async () => {
        const response = await testServer.get('/orders');
        expect(response.status).toBe(200);
        
    })
    it ('get the order show endpoint should return 401', async () => {
        const response = await testServer.get('/orders/1');
        expect(response.status).toBe(401);
    })
    it ('post the user create endpoint should return 401', async ()=>{
        const response = await testServer.post('/orders');
        expect(response.status).toBe(401);
    })
})