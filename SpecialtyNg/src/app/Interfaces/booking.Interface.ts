export interface bookingResponse {
    bookings: [
        {
            fullName: string,
            email: string
            profileImg: string
            sentTo: string,
            requestedPic: string,
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
    fullName: string,
    email: string,
    sentTo: string,
    requestedPic: string,
    profileImg: string
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