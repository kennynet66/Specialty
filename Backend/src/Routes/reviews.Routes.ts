import { Router } from "express";
import { createReview, getUserReviews } from "../Controllers/reviews.Controller";

const reviewRoutes = Router();

reviewRoutes.post('/create-review/:userId/:specialistId', createReview);
reviewRoutes.get('/user-reviews/:id', getUserReviews)

export default reviewRoutes