// importing dependecies and env variable
import express from "express";
import jwt from 'jsonwebtoken';
import { tokenSecret } from "../handlers/user";
// made a jwtValidator middleware that verifies the token fron the request body then continues the request if passed
// returns 401 if failed or missing
const jwtValidator = async (req: express.Request, res: express.Response, next: Function)=>{
    try{
        const token = req.body.token;
        if(jwt.verify(token, tokenSecret )){
            next();
        }
    } catch(e){
        res.status(401).send("Invalid jwt")
    }
}
// exported for handling
export default jwtValidator;