"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const output = await connection.query(sql);
            connection.release();
            return output.rows;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE id = ${id}`;
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0];
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async create(order) {
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO orders (user_id, status) VALUES (${order.userId}, '${order.status}')`;
            const selectsql = `SELECT * FROM orders WHERE user_id = ${order.userId}`;
            await connection.query(sql);
            const output = await connection.query(selectsql);
            connection.release();
            return output.rows[0];
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
