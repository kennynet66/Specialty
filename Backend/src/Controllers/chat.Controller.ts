import { Request, Response } from "express";
import { execute } from "../dbHelper/dbHelper";


export const userChats = (async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id as string;

        const procedure = 'userChats';

        const chats = (await execute(procedure, {userId})).recordset

        return res.status(200).json({
            chats
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})