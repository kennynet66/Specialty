export interface createInterfaceResponse {
    success: string
    error: string
}


export interface reviewsResponse {
    reviews: [
        {
            reviewId: string
            userId: string
            specialistId: string
            review: string
            postedAt: Date
            fullName: string
            profileImg: string
        }
    ]
}

export interface oneReview {
    reviewId: string
    userId: string
    specialistId: string
    review: string
    postedAt: Date
    fullName: string
    profileImg: string
}