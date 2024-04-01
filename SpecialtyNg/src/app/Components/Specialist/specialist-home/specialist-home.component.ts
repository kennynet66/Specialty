import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../Services/data.service';
import Swal from 'sweetalert2'
import { Booking } from '../../../Interfaces/booking.Interface';
import { CommonModule } from '@angular/common';
import { sBooking } from '../../../Interfaces/sBooking.Interface';

@Component({
  selector: 'app-specialist-home',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './specialist-home.component.html',
  styleUrl: './specialist-home.component.css'
})
export class SpecialistHomeComponent {


  userId!: string;
  bookings: sBooking[] = [];

  showSuccess(msg: string){
    Swal.fire({
      title: "Success",
      text: msg,
      icon: "success"
    });
  }

  showError(msg: string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
    });
  }

  acceptBooking(bookingId: string){
    console.log(bookingId);
    
    this.dataservice.acceptBooking(bookingId).subscribe(res => {
      if(res.success){
        this.bookings = []
        this.showSuccess(res.success)
        this.getUserId()
      }
    })
  }

  cancelBooking(bookingId: string){
    this.dataservice.cancelBooking(bookingId).subscribe(res =>{
      if(res.success){
        this.showSuccess(res.success);
        this.bookings = [];
        this.getUserId();
      }
    })
  }

  getUserId(){
    
    const token: string = localStorage.getItem('specialty_token') as string

    this.authservice.checkUserDetails(token).subscribe((res) => {
      console.log(res.info.userId);
      
      this.userId = res.info.userId
      this.getBookings(res.info.userId)
    })
  }
  
  constructor(private authservice: AuthService, private router: Router, private dataservice: DataService){
    this.getUserId()
  }

  getBookings(userId: string){

    this.dataservice.getSBookings(userId).subscribe(res => {
      res.bookings.forEach(booking => {this.bookings.push(booking)})
    })

  }
}
