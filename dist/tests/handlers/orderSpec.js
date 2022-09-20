"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const order_1 = __importDefault(require("../../handlers/order"));
server_1.default.use(order_1.default);
const testServer = (0, supertest_1.default)(server_1.default);
describe('Test order handler endpoint responses', () => {
    it('get the order index endpoint should return 200', async () => {
        const response = await testServer.get('/orders');
        expect(response.status).toBe(200);
    });
    it('get the order show endpoint should return 401', async () => {
        const response = await testServer.get('/orders/1');
        expect(response.status).toBe(401);
    });
    it('post the user create endpoint should return 401', async () => {
        const response = await testServer.post('/orders');
        expect(response.status).toBe(401);
    });
});
