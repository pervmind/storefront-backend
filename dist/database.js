"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing dotenv to get env variables
// importing pool to start postgres connection
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
// getting values from env file
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, TEST_DB } = process.env;
// checking for testing phase
let db = PGDATABASE;
if (process.env.ENV === 'test') {
    db = TEST_DB;
}
console.log(db);
// starting connection
const database = new pg_1.Pool({
    host: PGHOST,
    database: db,
    user: PGUSER,
    password: PGPASSWORD
});
exports.default = database;
