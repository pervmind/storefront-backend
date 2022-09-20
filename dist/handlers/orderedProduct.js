"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderedProduct_1 = require("../services/orderedProduct");
const jwtValidator_1 = __importDefault(require("../middleweres/jwtValidator"));
const dashboard = new orderedProduct_1.Dashboard();
const orderedProducts = async (req, res) => {
    try {
        const productAdded = await dashboard.addProduct(req.params.id, req.body.productId, req.body.quantity);
        res.json(productAdded);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const showProduct = async (req, res) => {
    try {
        const shownOrder = await dashboard.showProducts(parseInt(req.params.id));
        res.json(shownOrder);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
const dashboard_routes = (app) => {
    app.get("/orders/:id/products", jwtValidator_1.default, showProduct);
    app.post("/orders/:id/products", jwtValidator_1.default, orderedProducts);
};
exports.default = dashboard_routes;
