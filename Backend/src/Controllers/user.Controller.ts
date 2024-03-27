import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.Config";
import { UpdateUser } from "../Interfaces/user.Interface";
import { updateSchema } from "../Validators/user.Validator";
import { execute, query } from "../dbHelper/dbHelper";

export const setRole = (async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const { role } = req.body;

        const pool = await mssql.connect(sqlConfig);

        const result = (await pool.request()
            .input('userId', mssql.VarChar, userId)
            .input('role', mssql.VarChar, role.trim().toLocaleLowerCase())
            .query('UPDATE Users SET role = @role WHERE userId = @userId')).rowsAffected

        if (role === 'user') {
            return res.status(200).json({
                success: "user"
            })
        } else if (role === 'specialist') {
            return res.status(200).json({
                success: "specialist"
            })
        }



    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const updateDetails = (async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const userDetails: UpdateUser = req.body;
        const { error } = updateSchema.validate(req.body);

        if (error) {
            return res.status(202).json({
                error: error.details[0].message
            })
        }
        let procedure = 'updateDetails';

        const result = (await execute(procedure, {
            userId: userId,
            gender: userDetails.gender,
            DOB: userDetails.DOB,
            about: userDetails.about,
            country: userDetails.country,
            city: userDetails.city,
            rate: userDetails.rate,
            industry: userDetails.industry,
            phoneNumber: userDetails.phoneNumber,
            bankAcNo: userDetails.bankAcNo,
            bankAcName: userDetails.bankAcName
        })).rowsAffected

        return res.status(200).json({
            success: "Details updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const getAllUsers = (async (req: Request, res: Response) => {
    try {

        const users = (await query('SELECT * FROM Users')).recordset;

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
export const getOneUser = (async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        let procedure = 'getOneUser';

        const user = (await execute(procedure, { userId })).recordset

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
export const deleteUser = (async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        let procedure = 'deleteUser';

        const result = (await execute(procedure, { userId })).recordset

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
export const userDetails = (async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        let procedure = 'userDetails';

        const details = (await execute(procedure, { userId })).recordset

        return res.status(200).json({
            details
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

export const getAllSpecialists = (async (req: Request, res: Response) => {
    try {

        let procedure = 'getAllSpecialists';

        const specialists = (await query(procedure)).recordset

        return res.status(200).json({
            specialists
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const getOneSpecialist = (async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;

        let procedure = 'getOneSpecialist'

        const specialists = (await execute(procedure, { userId })).recordset

        return res.status(200).json({
            specialists
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const updateProfileImg = (async (req: Request, res: Response) =>{
    try {
        const id = req.params.id;

        console.log(id);
        
        
        const {image} = req.body
        
        console.log(req.body);
        let procedure = 'updateProfileImage';

        const result = (await execute(procedure, {id, image})).rowsAffected

        return res.status(200).json({
            success: "Profile image updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})