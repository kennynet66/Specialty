import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.Config";
import { UpdateUser } from "../Interfaces/user.Interface";
import { updateSchema } from "../Validators/user.Validator";

export const setRole = (async (req: Request, res : Response) =>{
    try {
        const userId = req.params.id;

        const { role } = req.body;

        const pool = await mssql.connect(sqlConfig);

        const result = (await pool.request()
        .input('userId', mssql.VarChar, userId)
        .input('role', mssql.VarChar, role.trim().toLocaleLowerCase())
        .query('UPDATE Users SET role = @role WHERE userId = @userId')).rowsAffected

        return res.status(200).json({
            success: "Role set successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const updateDetails = (async( req: Request, res: Response)=>{
    try {
        const userId = req.params.id;

        const userDetails: UpdateUser = req.body;
        const { error } = updateSchema.validate(req.body);

        if(error) {
            return res.status(202).json({
                error: error
            })
        }

        const pool = await mssql.connect(sqlConfig);

        const result = (await pool.request()
        .input('userId', mssql.VarChar, userId)
        .input('gender', mssql.VarChar, userDetails.gender.trim().toLocaleLowerCase())
        .input('DOB', mssql.VarChar, userDetails.DOB.trim().toLocaleLowerCase())
        .input('about', mssql.VarChar, userDetails.about.trim().toLocaleLowerCase())
        .input('country', mssql.VarChar, userDetails.country.trim().toLocaleLowerCase())
        .input('city', mssql.VarChar, userDetails.city.trim().toLocaleLowerCase())
        .input('industry', mssql.VarChar, userDetails.industry)
        .input('phoneNumber', mssql.VarChar, userDetails.phoneNumber.trim())
        .input('bankAcNo', mssql.BigInt, userDetails.bankAcNo)
        .input('bankAcName', mssql.VarChar, userDetails.bankAcName.trim().toLocaleLowerCase())
        .execute('updateDetails')
        ).rowsAffected

        return res.status(200).json({
            success: "Details updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const getAllUsers = (async(req: Request, res: Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig);

        const users = (await pool.request().query('SELECT * FROM Users')).recordset;

        res.status(200).json({
            users
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
});

// Get a single user by id
export const getOneUser = (async(req: Request, res: Response) =>{
    try {
        const userId = req.params.id;
        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
        .input('userId', userId)
        .query('SELECT * FROM Users WHERE userId = @userId')).recordset;

        return res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Delete a user
export const deleteUser = (async(req:Request, res: Response)=>{
    try {
        const userId = req.params.id;

        const pool = await mssql.connect(sqlConfig);

        const result = (await pool.request()
        .input('userId', userId)
        .query('DELETE FROM Details WHERE userId = @userId; DELETE FROM Users WHERE userId = @userId; '))

        return res.status(200).json({
            success: "User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

// Get details for a specific user

export const userDetails = (async (req: Request, res: Response)=>{
    try {
        const userId = req.params.id;
        const pool = await mssql.connect(sqlConfig);

        const details = (await pool.request()
        .input('userId', userId)
        .query('SELECT * FROM Details WHERE userId = @userId')).recordset

        return res.status(200).json({
            details
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})