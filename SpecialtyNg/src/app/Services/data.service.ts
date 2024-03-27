import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allIndustriesResponse, countriesApiResponse, specialistResponse, updateUserDetails } from '../Interfaces/data.Interface';
import { oneUserResponse } from '../Interfaces/user.Interface';
import { createInterfaceResponse, reviewsResponse } from '../Interfaces/reviews.Interface';
// import { reviewsResponse } from '../Interfaces/review.Interface'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getAllIndustries(){
    return this.http.get<allIndustriesResponse>('http://localhost:3900/industry/all')
  }

  setRole(userId: string, role:string){
    return this.http.put<{success: string}>(`http://localhost:3900/users/set-role/${userId}`, role)
  }

  updateUser(userDetails: updateUserDetails, userId: string){
    return this.http.put<{success: string}>(`http://localhost:3900/users/update-details/${userId}`, userDetails)
  }

  getCountries(){
    return this.http.get<{countries: countriesApiResponse[]}>("https://api.countrystatecity.in/v1/countries", {
      headers: {
        "X-CSCAPI-KEY": "bGM2ZzRGZm4xRzhnTzJkdmxkWEtlY2ROMmh3S1BYWXRsUWxTenVJYg=="
      }
    })
  }

  getUser(userId: string){
    return this.http.get<oneUserResponse>(`http://localhost:3900/users/one-user/${userId}`)
  }

  getAllSpecialists(){
    return this.http.get<specialistResponse>('http://localhost:3900/users/all-specialists')
  }

  getOneSpecialist(specialistId: string){
    return this.http.get<specialistResponse>(`http://localhost:3900/users/specialist/${specialistId}`)
  }
  
  createReview(userId: string, specialistId: string, review: string ){
    return this.http.post<createInterfaceResponse>(`http://localhost:3900/reviews/create-review/${userId}/${specialistId}`, { review })
  }

  getReviews(specialistId: string){
    return this.http.get<reviewsResponse>(`http://localhost:3900/reviews/user-reviews/${specialistId}`)
  }

  updateProfileImage(id: string, image: string){
    return this.http.post<{success: string, error: string}>(`http://localhost:3900/users/setProfileImage/${id}`, image)
  }
}
