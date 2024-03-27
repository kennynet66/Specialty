import { Request, Response } from "express";
import { v4 } from "uuid";
import { execute } from "../dbHelper/dbHelper";

export const createBooking = (async (req: Request, res: Response) => {
    try {
        const bookingId = v4();
        const userId = req.params.userId;
        const specialistId = req.params.specialistId;

        console.log(req.body);
        

        const { duration, jobDescription, salary } = req.body;

        let procedure = 'createBooking';

        const result = (await execute(procedure, { bookingId, userId, specialistId, jobDescription, salary, duration }))

        return res.status(200).json({
            success: "Booking request sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const acceptBooking = (async (req: Request, res: Response) => {
    try {
        const BookingId = req.params.id;

        let procedure = 'acceptBooking';

        const result = (await execute(procedure, {BookingId}))

        return res.status(200).json({
            success: "Booking accepted successfully"
        })
    } catch (error) {

        return res.status(500).json({
            error
        })
    }
})

export const cancelBooking = (async (req: Request, res: Response) => {
    try {
        const BookingId = req.params.id;

        let procedure = 'cancelBooking';

        const result = (await execute(procedure, ))

        return res.status(200).json({
            success: "Booking canceled successfully"
        })
    } catch (error) {

        return res.status(500).json({
            error
        })
    }
})

export const completeBooking = (async (req: Request, res: Response)=>{
    try {
        const bookingId = req.params.id;

        let procedure = 'completeBooking';

        const result = (await execute(procedure, {bookingId}))

        return res.status(200).json({
            success: "Job submitted for booking"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const getUserBookings = (async (req: Request, res: Response) =>{
    try {
        const userId = req.params.id;

        let procedure = "userBookings"

        const bookings = (await execute(procedure, {userId})).recordset

        return res.status(200).json({
            bookings
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})