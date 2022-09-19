import express from 'express'

import { Dashboard } from '../services/orderedProduct'
import jwtValidator from '../middleweres/jwtValidator'

const dashboard = new Dashboard()

const orderedProducts = async (req: express.Request, res: express.Response) => {
    console.log('dashboard_routes')

    const productAdded = await dashboard.addProduct(req.params.id, req.body.productId, req.body.quantity)
    res.json(productAdded)
}

const dashboard_routes = (app: express.Application) => {
    app.post("/orders/:id/products", jwtValidator, orderedProducts )
}
export default dashboard_routes