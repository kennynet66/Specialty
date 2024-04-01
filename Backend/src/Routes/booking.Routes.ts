import { Router } from "express";
import { acceptBooking, cancelBooking, completeBooking, createBooking, getCancelledBookings, getUserBookings } from "../Controllers/Booking.Controller";

const bookingRoutes = Router();

bookingRoutes.post('/create-booking/:userId/:specialistId', createBooking);
bookingRoutes.put('/accept-booking/:id', acceptBooking);
bookingRoutes.put('/cancel-booking/:id', cancelBooking);
bookingRoutes.put('/complete-booking/:id', completeBooking);
bookingRoutes.get('/user-bookings/:id', getUserBookings);
bookingRoutes.get('/canceled-bookings/:id', getCancelledBookings)

export default bookingRoutes;