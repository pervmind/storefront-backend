import supertest from 'supertest'
import app from '../../server';
import users_routes from '../../handlers/user';

app.use(users_routes)
const testServer = supertest(app);

describe ('Test user handler endpoint responses', () => {
    it('get the user index endpoint should return 401', async () => {
        const response = await testServer.get('/users');
        expect(response.status).toBe(401);
        
    })
    it ('get the user show endpoint should return 401', async () => {
        const response = await testServer.get('/users/1');
        expect(response.status).toBe(401);
    })
    it ('post the user create endpoint should return 200', async ()=>{
        const response = await testServer.post('/users');
        expect(response.status).toBe(200);
    })
    it ('post the user authenticate endpoint should return 401', async ()=>{
        const response = await testServer.post('/users/auth');
        expect(response.status).toBe(401);
    })
})