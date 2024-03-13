import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, signupResponse } from '../Interfaces/auth.Interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User){
    return this.http.post<signupResponse>('http://localhost:3900/auth/register', userDetails)
  }
  validateUser(userId: string){
    return this.http.put<{success:string, error: string}>(` http://localhost:3900/auth/validate-user/${userId}`, {})
  }
}
