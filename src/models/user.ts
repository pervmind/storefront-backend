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
    async show(username: string): Promise<User> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM users WHERE username = '${username}'`;
            console.log(sql);
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0]
        }catch(error){
            throw new Error(`${error}`)
        }
    }
    async create(user: User): Promise<User> {
        try{
            const connection = await database.connect();
            const hashed = bcrypt.hashSync(user.password + pepper, parseInt(rounds))
            const sql = `INSERT INTO users (username, password_hashed, first_name, last_name) VALUES ('${user.username}', '${hashed}', '${user.firstName}' , '${user.lastName}')`;
            console.log(hashed)
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0]
        }
        catch(error){
            throw new Error(`${error}`)
        }
    }
    async auth(username: string, password: string): Promise<User | null> {
        try{
            const connection = await database.connect();
            const sql = `SELECT password_hashed FROM users WHERE username = ${username}`
            const output = await connection.query(sql);
            if( output.rows.length ){        
                const user = output.rows[0];
                if (bcrypt.compareSync(password + pepper, user.password_hashed)){
                    return user
                }
            }
            return null
        } catch(error){
            throw new Error(`${error}`)
        }
    }
}
