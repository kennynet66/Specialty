export interface User {
    userId: string,
    profileImg: string,
    about: string,
    country: string,
    fullName: string,
    email: string,
    DOB: string;
    gender: string;
    city: string,
    phoneNumber: string,
    industry: string,
    industryName: string,
    rate: number,
    bankAcNo: number,
    bankAcName: string
}

export interface oneUserResponse {
    user: [
        {
            userId: string,
            profileImg: string,
            about: string,
            country: string,
            fullName: string,
            email: string,
            DOB: string;
            gender: string;
            city: string,
            phoneNumber: string,
            industryName: string
            industry: string,
            rate: number,
            bankAcNo: number,
            bankAcName: string
        }
    ]
}