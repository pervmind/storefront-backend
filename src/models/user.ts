// importing dependencies
import database from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
// getting salt and pepper from environment
dotenv.config();
const pepper = process.env.PEPPER;
const rounds = process.env.ROUNDS as string;
// defining User type and exported it for to be handled
export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}
// defining UserStore class and setting methods for database modeling
export class UserStore {
    // index method selects all from the users table in the database
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
    // show method selects one user from the users table and takes id as argument
    async show(id: number): Promise<User> {
        try{
            const connection = await database.connect();
            const sql = `SELECT * FROM users WHERE id = ${id}`;
            const output = await connection.query(sql);
            connection.release();
            return output.rows[0]
        }catch(error){
            throw new Error(`${error}`)
        }
    }
    // create method adds a new user to the users table and returns its jwt for authorization
    async create(user: User): Promise<User> {
        try{
            const connection = await database.connect();
            // used hashing to hash the input password and pepper for further secuirity
            const hashed = bcrypt.hashSync(user.password + pepper, parseInt(rounds))
            // then added the user with the hashed password to the users table
            const sql = `INSERT INTO users (username, password_hashed, first_name, last_name) VALUES ('${user.username}', '${hashed}', '${user.firstName}' , '${user.lastName}')`;
            const selectsql = `SELECT * FROM users WHERE username = '${user.username}'`;
            await connection.query(sql);
            const output = await connection.query(selectsql);
            connection.release();
            return output.rows[0]
        }
        catch(error){
            throw new Error(`${error}`)
        }
    }
    // auth method checks for username and password validity and returns null otherwise
    async auth(username: string, password: string): Promise<User | null> {
        try{
            // searching for user with entered username and checking for hashed password matching password
            const connection = await database.connect();
            const sql = `SELECT * FROM users WHERE username = '${username}'`
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
