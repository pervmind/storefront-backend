import database from "../database";
import { Order } from "../models/order";
export type ProductInOrder = {
    id: number,
    user_id: string,
    status: string,
    order_id: number,
    product_id: number,
    quantity: number
}
export class Dashboard {
    async addProduct(orderId: string, productId: string, quantity: string):Promise<{id : number ,user_id: number, status: string, order_id: number, quantity: number}[]> {
        try{
            
            const connection = await database.connect();
            const sql = `INSERT INTO products_order (order_id, product_id, quantity) VALUES (${orderId}, ${productId}, ${quantity})`;
            const selectsql = `SELECT * FROM products_order WHERE order_id = ${orderId}`
            await connection.query(sql);
            const output = await connection.query(selectsql);
            connection.release();
            return output.rows
        }catch(error){ 
            throw new Error(`Error adding product`);
        }

    }
    async showProducts(id: number): Promise<ProductInOrder[]> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM orders INNER JOIN products_order ON orders.id = products_order.order_id WHERE orders.id = ${id}`;
            const output = await connection.query(sql);
            connection.release();
            return output.rows
        }catch(error){
            throw new Error(`${error}`)
        }
    }
}