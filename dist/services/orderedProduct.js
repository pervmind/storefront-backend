"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const database_1 = __importDefault(require("../database"));
class Dashboard {
    async addProduct(orderId, productId, quantity) {
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO products_order (order_id, product_id, quantity) VALUES (${orderId}, ${productId}, ${quantity})`;
            const selectsql = `SELECT * FROM products_order WHERE order_id = ${orderId}`;
            await connection.query(sql);
            const output = await connection.query(selectsql);
            connection.release();
            return output.rows;
        }
        catch (error) {
            throw new Error(`Error adding product`);
        }
    }
    async showProducts(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM orders INNER JOIN products_order ON orders.id = products_order.order_id WHERE orders.id = ${id}`;
            const output = await connection.query(sql);
            connection.release();
            return output.rows;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.Dashboard = Dashboard;
