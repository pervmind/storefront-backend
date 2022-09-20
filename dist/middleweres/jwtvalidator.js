"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../handlers/user");
const jwtValidator = async (req, res, next) => {
    try {
        const token = req.body.token;
        if (jsonwebtoken_1.default.verify(token, user_1.tokenSecret)) {
            next();
        }
    }
    catch (e) {
        res.status(401).send("Invalid jwt");
    }
};
exports.default = jwtValidator;
