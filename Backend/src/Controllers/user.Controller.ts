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