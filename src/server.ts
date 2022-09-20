// importing dependencies and endpoint handler files
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import users_routes from './handlers/user'
import products_routes from './handlers/product'
import orders_routes from './handlers/order'
import dashboard_routes from './handlers/orderedProduct'
// started the instance of the application
const app: express.Application = express()
const address: string = "0.0.0.0:3000"
// used bodyParser
app.use(bodyParser.json())
// added cors
app.use(cors())
// set the home endpoint
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
// used the hanlers imported
users_routes(app)
products_routes(app)
orders_routes(app)
dashboard_routes(app)
// started server on port 3000
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
// exported app for testing
export default app
