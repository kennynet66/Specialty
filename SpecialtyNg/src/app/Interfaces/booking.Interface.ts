export interface bookingResponse {
    bookings: [
        {
            bookingId: string,
            userId: string,
            specialitId: string,
            duration: number,
            jobDescription: string,
            salary: number,
            isCompleted: boolean
            isCanceled: boolean
            isAccepted: boolean
        }
    ]
}

export interface Booking {
    bookingId: string,
    userId: string,
    specialitId: string,
    duration: number,
    jobDescription: string,
    salary: number,
    isCompleted: boolean
    isCanceled: boolean
    isAccepted: boolean
}