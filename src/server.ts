import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import users_routes from './handlers/user'
import products_routes from './handlers/product'
import orders_routes from './handlers/order'
import dashboard_routes from './handlers/orderedProduct'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
// added cors
app.use(cors())
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
users_routes(app)
products_routes(app)
orders_routes(app)
dashboard_routes(app)
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app
