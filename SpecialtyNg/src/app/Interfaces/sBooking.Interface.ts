export interface sbookingResponse {
    bookings: [
        {
            requestedBy: string,
            requesteeEmail: string,
            bookingId: string,
            userId: string,
            specialistId: string,
            duration: number,
            jobDescription: string,
            salary: number,
            isCompleted: boolean,
            isCanceled: boolean,
            isAccepted: boolean
        }
    ]
}

export interface sBooking {
    requestedBy: string,
    requesteeEmail: string,
    bookingId: string,
    userId: string,
    specialistId: string,
    duration: number,
    jobDescription: string,
    salary: number,
    isCompleted: boolean,
    isCanceled: boolean,
    isAccepted: boolean
}