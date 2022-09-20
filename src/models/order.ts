// importing database
import database from "../database";
//defining and exporting Order type
export type Order = {
    id: number;
    userId: number;
    status: string;
}
//defining and exporting OrderStore class and setting its methods for endpoints
export class OrderStore {
    // index method selects all orders from the orders table and lists them
    async index(): Promise<Order[]> {
        try{
            const connection = await database.connect();
            const sql = 'SELECT * FROM orders';
            const output = await connection.query(sql);
            connection.release();
            return output.rows
        } catch(error){
            throw new Error(`${error}`)
        }
    }
    // show method selects an order from the order table and takes id as argument
    async show(id: number): Promise<Order> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM orders WHERE id = ${id}`;
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0]
        }catch(error){
            throw new Error(`${error}`)
        }
    }
    // create method adds a new order to the order table and returns the entered order
    async create(order: Order): Promise<Order> {
        try{
            const connection = await database.connect();
            const sql = `INSERT INTO orders (user_id, status) VALUES (${order.userId}, '${order.status}')`;
            const selectsql = `SELECT * FROM orders WHERE user_id = ${order.userId}`;
            await connection.query(sql);
            const output = await connection.query(selectsql);
            connection.release();
            return output.rows[0]
        }
        catch(error){
            throw new Error(`${error}`)
        }
    }

}

