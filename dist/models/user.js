"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.PEPPER;
const rounds = process.env.ROUNDS;
class UserStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
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
            const sql = `SELECT * FROM users WHERE id = ${id}`;
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0];
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async create(user) {
        try {
            const connection = await database_1.default.connect();
            const hashed = bcrypt_1.default.hashSync(user.password + pepper, parseInt(rounds));
            const sql = `INSERT INTO users (username, password_hashed, first_name, last_name) VALUES ('${user.username}', '${hashed}', '${user.firstName}' , '${user.lastName}')`;
            const selectsql = `SELECT * FROM users WHERE username = '${user.username}'`;
            await connection.query(sql);
            const output = await connection.query(selectsql);
            connection.release();
            return output.rows[0];
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async auth(username, password) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM users WHERE username = '${username}'`;
            const output = await connection.query(sql);
            if (output.rows.length) {
                const user = output.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password_hashed)) {
                    return user;
                }
            }
            return null;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.UserStore = UserStore;
