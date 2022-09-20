"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jwtValidator_1 = __importDefault(require("../middleweres/jwtValidator"));
const productStore = new product_1.ProductStore();
const index = async (_req, res) => {
    const productsList = await productStore.index();
    res.json(productsList);
};
const show = async (req, res) => {
    try {
        const shownProduct = await productStore.show(parseInt(req.params.id));
        res.json(shownProduct);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
const create = async (req, res) => {
    try {
        const newProduct = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        };
        const product = await productStore.create(newProduct);
        res.json(product);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const products_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", jwtValidator_1.default, create);
};
exports.default = products_routes;
