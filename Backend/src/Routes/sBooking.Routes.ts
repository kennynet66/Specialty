import { Router } from "express";
import { getSpecialistBooking } from "../Controllers/sBooking.Controller";

const sBookingRoutes = Router()

sBookingRoutes.get('/bookings/:id', getSpecialistBooking)

export default sBookingRoutes;