import {Order, OrderStore} from "../../models/order"
import database from "../../database"
const testStore = new OrderStore()


describe('Order model', () => {
    beforeEach(async () => {
        const connection = await database.connect();
        const sql = 'DELETE FROM orders';
        const sql2 = 'DELETE FROM users';
        const sql3 = 'DELETE FROM products';
        await connection.query(sql)
        await connection.query(sql2)
        await connection.query(sql3)
        connection.release();
    })
    it('should have index method', ()=>{
        expect(testStore.index).toBeDefined()
    })

    it('index method should return orders list', async ()=>{
        const orders = await testStore.index()
        expect(orders).toEqual([])
    })
    it ('should have show method', ()=>{
        expect(testStore.show).toBeDefined()
    })
    it ('show method should not return an order', async ()=>{
        const order = await testStore.show(1);
        expect(order).toBeUndefined()
    })
    it ('should have create method', ()=>{
        expect(testStore.index).toBeDefined()
    })
    it ('create method should return a correct order status', async ()=>{
        const connection = await database.connect();
            const sql = `INSERT INTO users (id, username, password_hashed, first_name, last_name) VALUES (1, 'user', 'password', 'firstname', 'lastname')`;
            const selectsql = `SELECT * FROM users WHERE username = 'user'`;
            await connection.query(sql);
            await connection.query(selectsql);
        const newOrder: Order = {
            id: 1,
            userId: 1,
            status: "active"
        }
        const order = await testStore.create(newOrder);
        expect(order.status).toEqual(newOrder.status)
    })
})
