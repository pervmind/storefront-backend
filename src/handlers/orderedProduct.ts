import express from 'express'

import { Dashboard } from '../services/orderedProduct'
import jwtValidator from '../middleweres/jwtValidator'

const dashboard = new Dashboard()

const orderedProducts = async (req: express.Request, res: express.Response) => {
    try{
        const productAdded = await dashboard.addProduct(req.params.id, req.body.productId, req.body.quantity)
        res.json(productAdded)
    } catch (error) {
        res.status(400).send(error)
    }
}

const showProduct = async (req: express.Request, res: express.Response) => {
    try{
        const shownOrder = await dashboard.showProducts(parseInt(req.params.id));
        res.json(shownOrder);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    
}
const dashboard_routes = (app: express.Application) => {
    app.get("/orders/:id/products", jwtValidator, showProduct)
    app.post("/orders/:id/products", jwtValidator, orderedProducts )
}
export default dashboard_routes