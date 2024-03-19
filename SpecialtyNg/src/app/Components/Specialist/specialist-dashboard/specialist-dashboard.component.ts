import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UserSidebarComponent } from '../../Users/user-sidebar/user-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [ NavbarComponent, UserSidebarComponent, RouterOutlet ],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css'
})
export class SpecialistDashboardComponent {

}
