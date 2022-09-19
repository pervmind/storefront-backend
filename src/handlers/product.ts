import express  from "express";
import { Product, ProductStore } from "../models/product";
import jwtValidator from "../middleweres/jwtValidator"

const productStore = new ProductStore();

const index = async (_req: express.Request, res: express.Response) => {

    const productsList = await productStore.index();
    res.json(productsList);
}

const show = async (req: express.Request, res: express.Response) => {
    try{
        const shownProduct = await productStore.show(parseInt(req.params.id));
        res.json(shownProduct);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    
}

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

const products_routes = (app: express.Application)=>{
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", jwtValidator, create);
}
export default products_routes;