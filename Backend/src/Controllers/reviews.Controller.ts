import { Request, Response } from "express";
import { v4 } from "uuid";
import { Review } from "../Interfaces/review.Interface";
import { execute } from "../dbHelper/dbHelper";

export const createReview = (async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const specialistId = req.params.specialistId
        const reviewId = v4();
        const review: Review = req.body

        let procedure = 'createReview'

        const result = execute(procedure, {userId, specialistId, reviewId, review: review.review})

        return res.status(200).json({
            success: "Review created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const getUserReviews = (async (req: Request, res: Response)=>{
    try {
        const userId = req.params.id;
        let procedure = 'userReviews';
        const reviews = execute(procedure, {userId});
        
        return res.status(200).json({
            reviews
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})