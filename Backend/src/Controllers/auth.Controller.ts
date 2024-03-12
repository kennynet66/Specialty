import { Request, Response } from "express";
import { User } from "../Interfaces/auth.Interface";
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
        .input('rate', mssql.Int, userDetails.rate)
        .input('industry', mssql.VarChar, userDetails.industry)
        .input('isSpecialist', mssql.Bit, userDetails.isSpecialist)
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