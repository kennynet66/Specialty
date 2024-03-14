export interface User {
    fullName: string,
    email: string,
    password: string,
    rate: number,
    isSpecialist: Boolean
}

export interface Login {
    email: string,
    password: string
}

export interface Token {
    fullName: string,
    email: string,
    isAdmin: string
}