export interface signupResponse {
  success: string,
  error: string
}

export interface loginResponse{
  success: string,
  token: string,
  error: string
}

export interface User {
  fullName: string,
  email: string,
  password: string,
  rate: number,
  industry: string,
  isSpecialist: Boolean
}

export interface loginDetails{
  email: string,
  password: string
}

export interface userDetailsResponse {
  info: {
    userId: string,
    fullName: string,
    email: string,
    isAdmin: boolean,
    role: string
  }
}
