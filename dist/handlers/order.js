"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jwtValidator_1 = __importDefault(require("../middleweres/jwtValidator"));
const orderStore = new order_1.OrderStore();
const index = async (_req, res) => {
    const ordersList = await orderStore.index();
    res.json(ordersList);
};
const show = async (req, res) => {
    try {
        const shownOrder = await orderStore.show(parseInt(req.params.id));
        res.json(shownOrder);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
const create = async (req, res) => {
    try {
        const newOrder = {
            id: req.body.id,
            userId: req.body.userId,
            status: req.body.status
        };
        const order = await orderStore.create(newOrder);
        res.json(order);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const orders_routes = (app) => {
    app.get("/orders", index);
    app.get("/orders/:id", jwtValidator_1.default, show);
    app.post("/orders", jwtValidator_1.default, create);
};
exports.default = orders_routes;
