import { Request, Response } from "express";
import { execute } from "../dbHelper/dbHelper";


export const userChats = (async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id as string;

        let procedure = 'userChats';

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

export const chatMessages = (async (req: Request, res: Response) =>{
    try {
        const chatId: string = req.params.id as string;

        let procedure: string = 'chatMessages';

        const messages = (await execute(procedure, {chatId})).recordset

        return res.status(200).json({
            messages
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})