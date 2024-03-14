import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, loginDetails, signupResponse, userDetailsResponse } from '../Interfaces/auth.Interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User){
    return this.http.post<signupResponse>('http://localhost:3900/auth/register', userDetails)
  }
  validateUser(userId: string){
    return this.http.put<{success:string, token:string, error: string}>(` http://localhost:3900/auth/validate-user/${userId}`, {})
  }
  loginUser(userDetails: loginDetails){
    return this.http.post<{success: string, token: string, error: string}>('http://localhost:3900/auth/login', userDetails)
  }
  checkUserDetails(token: string){
    return this.http.get<userDetailsResponse>('http://localhost:3900/auth/details', {
      headers: {
        token
      }
    })
  }
}
