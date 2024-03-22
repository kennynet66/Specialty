import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLogged = false;
  token!: string;

  ngOnInit(): void {
    this.getToken()
  }

  getToken(){
    this.token = localStorage.getItem('specialty_token') as string;
    if(this.token){
      this.checkUserState();
    } else {
      this.isLogged = false
    }
  }
  constructor(private authservice: AuthService, private router: Router) {
    this.getToken();
  }

  checkUserState(){
    this.authservice.checkUserDetails(this.token).subscribe(res =>{
      if (res.info){
        this.isLogged = true
      }
    })
  }

  logout(){
    localStorage.removeItem('specialty_token')
    this.isLogged = false
    this.router.navigate(['/login'])
  }

}
