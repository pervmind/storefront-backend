import express  from "express";
import { Order, OrderStore } from "../models/order";
import jwtValidator from "../middleweres/jwtValidator"

const orderStore = new OrderStore();

const index = async (_req: express.Request, res: express.Response) => {

    const ordersList = await orderStore.index();
    res.json(ordersList);
}

const show = async (req: express.Request, res: express.Response) => {
    try{
        const shownOrder = await orderStore.show(parseInt(req.params.id));
        res.json(shownOrder);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    
}

const create = async (req: express.Request, res: express.Response) =>{
    try {
        const newOrder: Order = {
            id: req.body.id,
            userId: req.body.userId,
            status: req.body.status
        }

        const order = await orderStore.create(newOrder);
        res.json(order)
    }catch(error){
        res.status(400).send(error);
    }
}


const orders_routes = (app: express.Application)=>{
    app.get("/orders", index);
    app.get("/orders/:id", jwtValidator, show);
    app.post("/orders", jwtValidator, create);
}
export default orders_routes;