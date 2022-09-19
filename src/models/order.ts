import database from "../database";

export type Order = {
    id: number;
    userId: number;
    status: string;
}

export class OrderStore {
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
    
    async show(id: number): Promise<Order[]> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM orders WHERE id = ${id}`;
            const sql2 = `SELECT * FROM orders INNER JOIN products_order ON orders.id = products_order.order_id WHERE orders.id = ${id}`;
            console.log(sql2);
            const output = await connection.query(sql2);
            connection.release();
            return output.rows
        }catch(error){
            throw new Error(`${error}`)
        }
    }

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

