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
