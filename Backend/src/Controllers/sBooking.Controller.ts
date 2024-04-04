import { Request, Response } from "express";
import { execute } from "../dbHelper/dbHelper";

export const getSpecialistBooking = (async(req: Request, res: Response) => {
    try {
        const specialistId:string = req.params.id as string;

        const procedure: string = 'sBookings';

        const bookings = (await execute(procedure, {specialistId})).recordset;

        return res.status(200).json({
            bookings
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
});

export const sCancelledBookings = (async (req: Request, res: Response) => {
    try {
        const specialistId: string = req.params.id as string;

        const procedure: string = 'sCancelled';

        const bookings = (await execute(procedure, { specialistId })).recordset

        return res.status(200).json({
            bookings
        })
        
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

export const acceptedBookings = (async(req: Request, res: Response) => {
    try {
        const specialistId = req.params.id;

        const procedure = 'acceptedBookings';

        const bookings = (await (execute(procedure, {specialistId}))).recordset;

        return res.status(200).json({
            bookings
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})