// importing express and product model
// importing jwt middleware
import express  from "express";
import { Product, ProductStore } from "../models/product";
import jwtValidator from "../middleweres/jwtValidator"
// creatign instance of prductstore class
const productStore = new ProductStore();
// index method takes products list from model and sends it as json
const index = async (_req: express.Request, res: express.Response) => {

    const productsList = await productStore.index();
    res.json(productsList);
}
// show method passes id from request and takes product from model and sends it as json
const show = async (req: express.Request, res: express.Response) => {
    try{
        const shownProduct = await productStore.show(parseInt(req.params.id));
        res.json(shownProduct);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    
}
// create method takes product info from request passes it to model then returns created product
const create = async (req: express.Request, res: express.Response) =>{
    try {
        const newProduct: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        }

        const product = await productStore.create(newProduct);
        res.json(product)
    }catch(error){
        res.status(400).send(error);
    }
}
// creating endpoints and exporting them to server and testing
const products_routes = (app: express.Application)=>{
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", jwtValidator, create);
}
export default products_routes;