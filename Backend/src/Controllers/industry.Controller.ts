import { Request, Response } from "express";
import { v4 } from 'uuid';
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.Config";
import { Industry } from "../Interfaces/industry.Interface";
import { industrySchema } from "../Validators/industry.Validator";

export const createIndustry = (async (req: Request, res: Response) => {
    try {
        // Validate the request
        const { error } = industrySchema.validate(req.body);

        if(error){
            return res.status(202).json({
                error: error.details[0].message
            })
        }
        const industryDetails: Industry = req.body;
        const pool = await mssql.connect(sqlConfig);

        const industryExists = (await pool.request()
        .input('industryName', mssql.VarChar, industryDetails.industryName)
        .execute('industryExists')
        ).recordset
        if(industryExists.length >= 1) {
            return res.status(202).json({
                error: "Industry already exists"
            })
        }
        const industryId = v4();

        const result = (await pool.request()
            .input("industryId", mssql.VarChar, industryId)
            .input("industryName", mssql.VarChar, industryDetails.industryName.trim().toLocaleLowerCase())
            .execute('createIndustry')
        ).rowsAffected
        return res.status(200).json({
            success: "Industry created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})