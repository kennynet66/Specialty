import { Router } from "express";
import { acceptBooking, cancelBooking, completeBooking, createBooking } from "../Controllers/Booking.Controller";

const bookingRoutes = Router();

bookingRoutes.post('/create-booking/:userId/:specialistId', createBooking);
bookingRoutes.put('/accept-booking/:id', acceptBooking);
bookingRoutes.put('/cancel-booking', cancelBooking);
bookingRoutes.put('/complete-booking', completeBooking);

export default bookingRoutes;