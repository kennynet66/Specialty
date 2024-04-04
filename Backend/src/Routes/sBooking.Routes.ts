import { Router } from "express";
import { acceptedBookings, getSpecialistBooking, sCancelledBookings } from "../Controllers/sBooking.Controller";

const sBookingRoutes = Router()

sBookingRoutes.get('/bookings/:id', getSpecialistBooking);
sBookingRoutes.get('/cancelled/:id', sCancelledBookings);
sBookingRoutes.get('/accepted/:id', acceptedBookings);

export default sBookingRoutes;