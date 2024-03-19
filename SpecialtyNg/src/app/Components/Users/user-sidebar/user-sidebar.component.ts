import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [ RouterLink, CommonModule ],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {

  token!: string;
  isUser = false;
  constructor(private authservice: AuthService, private router: Router){
    this.getToken();
  }

  getToken(){
    this.token = localStorage.getItem('specialty_token') as string;
    this.checkUserState();
  }

  checkUserState(){
    this.authservice.checkUserDetails(this.token).subscribe(res =>{
      console.log(res);
      
      if (res.info.role === 'specialist'){
        this.isUser = false
      } else if(res.info.role==='user'){
        this.isUser = true
      }
    })
  }

  navigateToProfile(){
    this.authservice.checkUserDetails(this.token).subscribe(res => {
      if(res.info){
        if(res.info.role === 'specialist'){
          this.router.navigate(['specialist-dashboard/profile',res.info.userId])
        }else if(res.info.role === 'user'){
          this.router.navigate(['user-dashboard/profile',res.info.userId])
        }
        
      }
    })
  }
}
