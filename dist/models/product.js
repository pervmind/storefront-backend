"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
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
            const sql = `SELECT * FROM products WHERE id = ${id}`;
            console.log(sql);
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0];
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async create(product) {
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO products (name, price) VALUES ('${product.name}', ${product.price})`;
            const selectsql = `SELECT * FROM products WHERE name = '${product.name}'`;
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
exports.ProductStore = ProductStore;
