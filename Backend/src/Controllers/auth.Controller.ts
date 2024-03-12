import { Request, Response } from "express";
import { User } from "../Interfaces/auth.Interface";
import { registerSchema } from "../Validators/auth.Validator";
import { sqlConfig } from "../Config/sql.Config";
import mssql from 'mssql';
import bcrypt from 'bcrypt';

export const registerUser = (async( req: Request, res: Response) =>{
    try {
        const userDetails: User = req.body;

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(202).json({
                error: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig);

        const hashPwd = await bcrypt.hash(userDetails.password, 5);

        const result = (await pool.request()
        .input('fullName', mssql.VarChar, userDetails.fullName)
        .input('email', mssql.VarChar, userDetails.email)
        .input('password', mssql.VarChar, hashPwd)
        .input('rate', mssql.Int, userDetails.rate)
        .input('industry', mssql.VarChar, userDetails.industry)
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