import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UserSidebarComponent } from '../../Users/user-sidebar/user-sidebar.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { DataService } from '../../../Services/data.service';
import { Booking } from '../../../Interfaces/booking.Interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [ NavbarComponent, UserSidebarComponent, RouterOutlet, RouterLink, CommonModule ],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css'
})
export class SpecialistDashboardComponent {


  userId!: string;
  bookings: Booking[] = [];

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

  getUserId(){
    
    const token: string = localStorage.getItem('specialty_token') as string

    this.authservice.checkUserDetails(token).subscribe((res) => {
      console.log(res.info.userId);
      
      this.userId = res.info.userId

      setTimeout(() => {
        this.getBookings(this.userId)
      }, 100);
    })
  }
  
  constructor(private authservice: AuthService, private router: Router, private dataservice: DataService){
    this.getUserId()
  }

  getBookings(userId: string){
    console.log(this.userId);
    
    this.dataservice.getUserBookings(userId).subscribe(res => {
      res.bookings.forEach(booking => {
        console.log(booking);
        
        this.bookings.push(booking)
      })
    })
  }
}
