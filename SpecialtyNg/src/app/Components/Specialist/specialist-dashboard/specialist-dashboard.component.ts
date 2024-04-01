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

}
