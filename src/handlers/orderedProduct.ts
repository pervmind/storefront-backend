// importing express
import express from 'express'
// importing dashboard nad jwt middleware
import { Dashboard } from '../services/orderedProduct'
import jwtValidator from '../middleweres/jwtValidator'
// creating instance of dashboard class
const dashboard = new Dashboard()
// ordered products method adds an existing product to an existing order in the products_order table in a many to many relationship
// it returns added product in response
const orderedProducts = async (req: express.Request, res: express.Response) => {
    try{
        const productAdded = await dashboard.addProduct(req.params.id, req.body.productId, req.body.quantity)
        res.json(productAdded)
    } catch (error) {
        res.status(400).send(error)
    }
}
// show product method searches the products_order table for the products added to a certain order id 
// it lists them and sends them in response
const showProduct = async (req: express.Request, res: express.Response) => {
    try{
        const shownOrder = await dashboard.showProducts(parseInt(req.params.id));
        res.json(shownOrder);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    
}
// creating endpoints for server and testing
const dashboard_routes = (app: express.Application) => {
    app.get("/orders/:id/products", jwtValidator, showProduct)
    app.post("/orders/:id/products", jwtValidator, orderedProducts )
}
export default dashboard_routes