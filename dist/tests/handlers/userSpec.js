"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const user_1 = __importDefault(require("../../handlers/user"));
server_1.default.use(user_1.default);
const testServer = (0, supertest_1.default)(server_1.default);
describe('Test user handler endpoint responses', () => {
    it('get the user index endpoint should return 401', async () => {
        const response = await testServer.get('/users');
        expect(response.status).toBe(401);
    });
    it('get the user show endpoint should return 401', async () => {
        const response = await testServer.get('/users/1');
        expect(response.status).toBe(401);
    });
    it('post the user create endpoint should return 200', async () => {
        const response = await testServer.post('/users');
        expect(response.status).toBe(200);
    });
    it('post the user authenticate endpoint should return 401', async () => {
        const response = await testServer.post('/users/auth');
        expect(response.status).toBe(401);
    });
});
