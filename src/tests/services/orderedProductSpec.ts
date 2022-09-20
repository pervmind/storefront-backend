import database from "../../database"
import { Order } from "../../models/order"
import { Dashboard } from "../../services/orderedProduct"
const board = new Dashboard

describe("OrderedProduct service", () => {
    beforeEach(async () => {
        const connection = await database.connect();
        const sql = 'DELETE FROM orders';
        const sql2 = 'DELETE FROM users';
        const sql3 = 'DELETE FROM products';
        const sql4 = 'DELETE FROM products_order';
        await connection.query(sql)
        await connection.query(sql2)
        await connection.query(sql3)
        await connection.query(sql4)
        const sql7 = `INSERT INTO users (id, username, password_hashed, first_name, last_name) VALUES (1, 'user', 'password', 'name', 'name')`
        const sql5 = `INSERT INTO orders (id, user_id, status) VALUES (1, 1, 'active')`
        const sql6 = `INSERT INTO products (id, name, price) VALUES (1, 'product', 10)`
        await connection.query(sql7)
        await connection.query(sql5)
        await connection.query(sql6)
        connection.release();
    })
    it ("should have addProduct method", () => {
        expect(board.addProduct).toBeDefined();
    })
    it ("should have showProducts method", () => {
        expect(board.showProducts).toBeDefined();
    })
    it ("should return correct order id", async ()=>{
        const order = await board.addProduct('1', '1', '2')
        expect(order[0].order_id).toEqual(1)
    })
//    it ("should return products list", async ()=>{
//        const products = await board.showProducts(1)
//        console.log(products)
//        expect(products.length).toEqual(1)
//    })
})