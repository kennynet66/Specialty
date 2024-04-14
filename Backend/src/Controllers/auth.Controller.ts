import { Request, Response, response } from "express";
import { Login, Token, User } from "../Interfaces/auth.Interface";
import { loginSchema, registerSchema } from "../Validators/auth.Validator";
import { sqlConfig } from "../Config/sql.Config";
import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { v4 } from "uuid";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ExtendedUserRequest } from "../Middleware/verifyToken";

dotenv.config();

export function createToken(user: Token) {
    const token = jwt.sign(user, process.env.SECRET as string, {
        expiresIn: 3 * 24 * 24 * 60
    })
    return token
}

export const registerUser = (async (req: Request, res: Response) => {
    try {
        const userDetails: User = req.body;

        const { error } = registerSchema.validate(req.body);
        
        const userId = v4();

        if (error) {
            return res.status(202).json({
                error: error.details[0].message
            })
        }
        const pool = await mssql.connect(sqlConfig);

        const hashPwd = await bcrypt.hash(userDetails.password, 5);

        const result = (await pool.request()
            .input('userId', mssql.VarChar, userId)
            .input('fullName', mssql.VarChar, userDetails.fullName.trim().toLocaleLowerCase())
            .input('email', mssql.VarChar, userDetails.email.trim().toLocaleLowerCase())
            .input('password', mssql.VarChar, hashPwd)
            .execute('registerUser')
        ).rowsAffected

        return res.status(200).json({
            success: "Registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const loginUser = (async (req: Request, res: Response) => {
    try {
        const loginDetails: Login = req.body;

        const { error } =loginSchema.validate(req.body);

        if(error) {
            return res.status(202).json({
                error: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
            .input('email', mssql.VarChar, loginDetails.email)
            .query('SELECT * FROM Users WHERE email = @email')).recordset;
        console.log(user);
        
        if (user.length < 1) {
            return res.status(202).json({
                error: "User not found"
            })
        }

        const userCredentials = user.map(response => {
            const { password, isUser, isVerified, isWelcomed, ...rest } = response;

            return rest;
        })

        const isVerified = user[0].isVerified

        if (!isVerified) {
            return res.status(202).json({
                error: "You need to verify your email to login"
            })
        }

        const isPwd = await bcrypt.compare(loginDetails.password, user[0].password);

        if (!isPwd) {
            return res.status(202).json({
                error: "Incorrect password"
            })
        }

        const token = createToken(userCredentials[0])

        return res.status(200).json({
            success: "Login successful",
            token
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const validateUser = (async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const detailsId = v4();

        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
            .input('userId', mssql.VarChar, userId)
            .query('SELECT * FROM Users WHERE userId = @userId AND isVerified = 0')).recordset

        if (user.length < 1) {
            return res.status(202).json({
                error: "Email is already verified"
            })
        }

        const result = (await pool.request()
            .input('userId', mssql.VarChar, userId)
            .input('detailsId', mssql.VarChar, detailsId)
            .execute('validateUser')
        ).rowsAffected

        const userCredentials = user.map(response => {
            const { password, isUser, isVerified, isWelcomed, ...rest } = response;

            return rest;
        })

        const token = createToken(userCredentials[0]);

        return res.status(200).json({
            success: "Email successfully validated",
            token
        });
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const checkUserDetails = (async (req: ExtendedUserRequest, res: Response) => {
    if (req.info) {
        return res.json({
            info: req.info
        })
    }
})