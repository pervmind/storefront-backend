import database from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.PEPPER;
const rounds = process.env.ROUNDS as string;

export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try{
            const connection = await database.connect();
            const sql = 'SELECT * FROM users';
            const output = await connection.query(sql);
            connection.release();
            return output.rows
        } catch(error){
            throw new Error(`${error}`)
        }
    }
    async show(id: number): Promise<User> {
        try{
            const connection = await database.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const output = await connection.query(sql, [id]);
            connection.release();
            return output.rows[0]
        }catch(error){
            throw new Error(`${error}`)
        }
    }
    async create(user: User): Promise<User> {
        try{
            const connection = await database.connect();
            const sql = 'INSERT INTO users (username, password_hashed, first_name, last_name) VALUES ($1, $2, $3, $4)';
            const hashed = bcrypt.hashSync(user.password + pepper, parseInt(rounds))
            const output = await connection.query(sql, [user.username, hashed, user.firstName, user.lastName]);
            connection.release();
            return output.rows[0]
        }
        catch(error){
            throw new Error(`${error}`)
        }
    }
    async auth(username: string, password: string): Promise<User | null> {
        
        const connection = await database.connect();
        const sql = 'SELECT password_hashed FROM users WHERE username = ($1)'
        const output = await connection.query(sql, [username]);
        if( output.rows.length ){        
        const user = output.rows[0];
            if (bcrypt.compareSync(password + pepper, user.password_hashed)){
                return user
            }
        }
        return null
    }
}
