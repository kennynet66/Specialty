import { Router } from "express";
import { getSpecialistBooking, sCancelledBookings } from "../Controllers/sBooking.Controller";

const sBookingRoutes = Router()

sBookingRoutes.get('/bookings/:id', getSpecialistBooking)
sBookingRoutes.get('/cancelled/:id', sCancelledBookings)

export default sBookingRoutes;