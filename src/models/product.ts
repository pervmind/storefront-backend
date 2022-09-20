import database from "../database";

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class ProductStore {
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