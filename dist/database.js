"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// importing dotenv to get env variables
// importing pool to start postgres connection
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
// getting values from env file
var _a = process.env, PGHOST = _a.PGHOST, PGDATABASE = _a.PGDATABASE, PGUSER = _a.PGUSER, PGPASSWORD = _a.PGPASSWORD, TEST_DB = _a.TEST_DB;
// checking for testing phase
var db = PGDATABASE;
if (process.env.ENV === 'test') {
    db = TEST_DB;
}
// starting connection
var database = new pg_1.Pool({
    host: PGHOST,
    database: db,
    user: PGUSER,
    password: PGPASSWORD
});
exports["default"] = database;
