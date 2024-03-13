import { Request, Response } from "express";
import { Login, User } from "../Interfaces/auth.Interface";
import { registerSchema } from "../Validators/auth.Validator";
import { sqlConfig } from "../Config/sql.Config";
import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { v4 } from "uuid";

export const registerUser = (async( req: Request, res: Response) =>{
    try {
        const userDetails: User = req.body;

        const userId = v4();

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(202).json({
                error: error.details[0].message
            })
        }
        const pool = await mssql.connect(sqlConfig);
        // Check if user exists
        const userExists = (await pool.request()
        .input('email', mssql.VarChar, userDetails.email.trim().toLocaleLowerCase())
        .query('SELECT * FROM Users WHERE email = @email')).recordset

        if(userExists.length >= 1){
            return res.status(202).json({
                error: "User with that email already exists"
            })
        }

        const hashPwd = await bcrypt.hash(userDetails.password, 5);

        const result = (await pool.request()
        .input('userId', mssql.VarChar, userId)
        .input('fullName', mssql.VarChar, userDetails.fullName.trim().toLocaleLowerCase())
        .input('email', mssql.VarChar, userDetails.email.trim().toLocaleLowerCase())
        .input('password', mssql.VarChar, hashPwd)
        .execute('registerUser')
        ).rowsAffected

        return res.status(202).json({
            success: "Registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const loginUser = (async (req: Request, res: Response)=>{
    try {
        const loginDetails: Login = req.body;

        const pool = await mssql.connect(sqlConfig);

        const findUser = (await pool.request()
        .input('email', mssql.VarChar, loginDetails.email)
        .query('SELECT * FROM Users WHERE email = @email')).recordset;

        if(findUser.length < 1) {
            return res.status(202).json({
                error: "User not found"
            })
        }

        const isVerified = findUser[0].isVerified

        if(!isVerified){
            return res.status(202).json({
                error: "You need to verify your email to login"
            })
        }

        const isPwd = await bcrypt.compare(loginDetails.password, findUser[0].password);

        if(!isPwd){
            return res.status(202).json({
                error: "Incorrect password"
            })
        }

        return res.status(200).json({
            success: "Login successful"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const validateUser = (async (req: Request, res: Response) =>{
    try {
        const userId = req.params.id;

        const pool = await mssql.connect(sqlConfig);

        const result = (await pool.request()
        .input('userId', mssql.VarChar, userId)
        .query('UPDATE Users SET isVerified = 1 WHERE userId = @userId')
        ).rowsAffected

        if (result[0]){
            return res.status(200).json({
                success: "Email successfully vaildated"
            })
        } else if(result[0] < 0){
            return res.status(202).json({
                error: "There was an error trying to validate email"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})