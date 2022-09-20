//importing database
import database from "../database";
//defining and exporting Product type
export type Product = {
    id: number;
    name: string;
    price: number;
}
//defining and exporting ProductStore class and setting its methods for endpoints
export class ProductStore {
    // index method selects all products in products table and returns them in a list
    async index(): Promise<Product[]> {
        try{
            const connection = await database.connect();
            const sql = 'SELECT * FROM products';
            const output = await connection.query(sql);
            connection.release();
            return output.rows
        } catch(error){
            throw new Error(`${error}`)
        }
    }
    // show method selects one product in products table and takes id as argument
    async show(id: number): Promise<Product> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM products WHERE id = ${id}`;
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0]
        }catch(error){
            throw new Error(`${error}`)
        }
    }
    // create method takes name and price and adds it to the products table returning the endered projuct
    async create(product: Product): Promise<Product> {
        try{
            const connection = await database.connect();
            const sql = `INSERT INTO products (name, price) VALUES ('${product.name}', ${product.price})`;
            const selectsql = `SELECT * FROM products WHERE name = '${product.name}'`;
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