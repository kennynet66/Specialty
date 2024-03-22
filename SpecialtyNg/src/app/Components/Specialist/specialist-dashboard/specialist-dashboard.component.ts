import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UserSidebarComponent } from '../../Users/user-sidebar/user-sidebar.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [ NavbarComponent, UserSidebarComponent, RouterOutlet, RouterLink ],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css'
})
export class SpecialistDashboardComponent {
  constructor(private authservice: AuthService, private router: Router){
    // this.getToken();
  }
}
