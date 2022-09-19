import database from "../database";

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
}