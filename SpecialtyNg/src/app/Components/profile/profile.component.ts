import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Interfaces/user.Interface';
import { DataService } from '../../Services/data.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user = {} as User;

  userId!: string;
  token!: string;

  getToken(){
    this.token = localStorage.getItem('specialty_token') as string;
    this.getUserId()
  }
  getUserId(){
    this.route.params.subscribe((params) =>{
      this.userId = params['id'];
    })
    this.getUserDetails();
  }

  constructor(private dataservice: DataService, private router: Router, private route: ActivatedRoute){
    this.getToken()
  }

  getUserDetails(){
    this.dataservice.getUser(this.userId).subscribe(res =>{
      console.log(res);
      
      this.user = res.user[0]
    })
  }
}
