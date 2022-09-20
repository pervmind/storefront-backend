"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const product_1 = __importDefault(require("../../handlers/product"));
server_1.default.use(product_1.default);
const testServer = (0, supertest_1.default)(server_1.default);
describe('Test product handler endpoint responses', () => {
    it('get the product index endpoint should return 200', async () => {
        const response = await testServer.get('/products');
        expect(response.status).toBe(200);
    });
    it('get the product show endpoint should return 200', async () => {
        const response = await testServer.get('/products/1');
        expect(response.status).toBe(200);
    });
    it('post the product create endpoint should return 401', async () => {
        const response = await testServer.post('/products');
        expect(response.status).toBe(401);
    });
});
