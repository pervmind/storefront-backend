import express from "express";
import jwt from 'jsonwebtoken';
import { tokenSecret } from "../handlers/user";

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
export default jwtValidator;