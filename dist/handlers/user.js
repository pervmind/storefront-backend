"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSecret = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwtValidator_1 = __importDefault(require("../middleweres/jwtValidator"));
dotenv_1.default.config();
exports.tokenSecret = process.env.SECRETTOKEN;
const userStore = new user_1.UserStore();
const index = async (_req, res) => {
    const usersList = await userStore.index();
    res.json(usersList);
};
const show = async (req, res) => {
    try {
        const shownUser = await userStore.show(parseInt(req.params.id));
        res.json(shownUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
const create = async (req, res) => {
    try {
        const newUser = {
            id: req.body.id,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        const user = await userStore.create(newUser);
        const jwtoken = jsonwebtoken_1.default.sign({ user }, exports.tokenSecret);
        console.log(jwtoken);
        res.json(jwtoken);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const authentication = async (req, res) => {
    try {
        const userName = req.body.username;
        const password = req.body.password;
        const user = await userStore.auth(userName, password);
        res.json(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const users_routes = (app) => {
    app.get("/users", jwtValidator_1.default, index);
    app.get("/users/:id", jwtValidator_1.default, show);
    app.post("/users", create);
    app.post("/users/auth", jwtValidator_1.default, authentication);
};
exports.default = users_routes;
