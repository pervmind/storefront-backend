// importing all dependencies
import express  from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import jwtValidator from "../middleweres/jwtValidator"
// getting and exporting jwt secret
dotenv.config();
export const tokenSecret = process.env.SECRETTOKEN as string;
// creating istance of userstore
const userStore = new UserStore();
// index method takes users list from model and rends it in response as json
const index = async (_req: express.Request, res: express.Response) => {

    const usersList = await userStore.index();
    res.json(usersList);
}
// show method takes selected user and sends it in response
const show = async (req: express.Request, res: express.Response) => {
    try{
        const shownUser = await userStore.show(parseInt(req.params.id));
        res.json(shownUser);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
    
}
// create method takes created user from model make the jwt and sends it as response
const create = async (req: express.Request, res: express.Response) =>{
    try {
        const newUser: User = {
            id: req.body.id,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }

        const user = await userStore.create(newUser);
        const jwtoken = jwt.sign({ user }, tokenSecret )
        res.json(jwtoken)
    }catch(error){
        res.status(400).send(error);
    }
}
// auth method passes username and password and sends user as response if successful
const authentication = async (req: express.Request, res: express.Response) => {
    try {
        const userName = req.body.username
        const password = req.body.password
        const user = await userStore.auth(userName, password);
        res.json(user)
    }catch(error){
        res.status(400).send(error);
    }
}
// setting endpoints and exporting it to server and testing
const users_routes = (app: express.Application) => {
    app.get("/users", jwtValidator, index);
    app.get("/users/:id", jwtValidator, show);   
    app.post("/users", create);
    app.post("/users/auth",jwtValidator, authentication)
}
export default users_routes;