import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../Interfaces/auth.Interface";
// import { User } from "../interface/user.Interface";
dotenv.config();

export interface ExtendedUserRequest extends Request{
    info?: User
}

export const verifyToken = (async(req: ExtendedUserRequest, res: Response, next: NextFunction) => {
    try {
        // get the token from headers
        const token = req.headers['token'] as string;
        if(!token){
            return res.json({
                error: "You do not have access"
            })
        }

        const data = jwt.verify(token, process.env.SECRET as string) as User

        req.info = data
    } catch (error) {
        res.status(500).json({
            error
        })
    }
    next();
})