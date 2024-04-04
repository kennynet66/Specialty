import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Booking } from '../../Interfaces/booking.Interface';
import { DataService } from '../../Services/data.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  cancelledBookings: Booking[] = [];
  pendingBookings: Booking[] = [];
  acceptedBookings: Booking[] = [];
  userId!: string;
  role!: string;

  getUserId() {

    const token: string = localStorage.getItem('specialty_token') as string

    this.authservice.checkUserDetails(token).subscribe((res) => {
      console.log(res.info.userId);
      this.role = res.info.role;
      this.userId = res.info.userId
      this.canceledBookings(res.info.userId);
      this.getUserBookings(this.userId)
    })
  }

  constructor(private dataservice: DataService, private authservice: AuthService) {
    this.getUserId();
  }

  canceledBookings(userId: string) {

    if (this.role === 'user') {
      this.dataservice.canceledBookings(userId).subscribe(res => {
        res.bookings.forEach(booking => {
          this.cancelledBookings.push(booking)
        })

      })
    } else if(this.role === 'specialist') {
      this.dataservice.sCancelledBookings(userId).subscribe(res => {
        console.log(res);
        
        res.bookings.forEach(booking => {
          this.cancelledBookings.push(booking)
        })
      })
    }
  }

  getUserBookings(userId: string) {
    if (this.role === 'user') {
      this.dataservice.getUserBookings(userId).subscribe(res => {
        console.log(res)
        res.bookings.forEach(booking => {
          this.pendingBookings.push(booking)
        })
      })
    } else if (this.role === 'specialist') {
      this.dataservice.getSAcceptedBookings(userId).subscribe(res => {
        res.bookings.forEach(booking => this.acceptedBookings.push(booking))
      })
    }
  }

}
