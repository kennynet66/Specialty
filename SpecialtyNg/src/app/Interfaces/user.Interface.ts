export interface User {
    userId: string,
    profileImg: string
    fullName: string,
    email: string,
    DOB: string;
    gender: string;
    city: string,
    phoneNumber: string,
    industryName: string
}

export interface oneUserResponse {
    user: [
        {
            userId: string,
            profileImg: string
            fullName: string,
            email: string,
            DOB: string;
            gender: string;
            city: string,
            phoneNumber: string,
            industryName: string
        }
    ]
}