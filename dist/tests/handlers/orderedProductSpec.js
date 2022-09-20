"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const orderedProduct_1 = __importDefault(require("../../handlers/orderedProduct"));
server_1.default.use(orderedProduct_1.default);
const testServer = (0, supertest_1.default)(server_1.default);
describe('Test dashboard handler endpoint responses', () => {
    it('get the ordered products endpoint should return 401', async () => {
        const response = await testServer.get('/orders/:id/products');
        expect(response.status).toBe(401);
    });
    it('get the show products endpoint should return 401', async () => {
        const response = await testServer.post('/orders/:id/products');
        expect(response.status).toBe(401);
    });
});
