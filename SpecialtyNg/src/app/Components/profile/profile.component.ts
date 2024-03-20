import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Interfaces/user.Interface';
import { DataService } from '../../Services/data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {} as User;
  userId!: string;
  token!: string;

  constructor(
    private dataservice: DataService,
    private router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getToken();
  }

  async updateProfile() {
    const { value: formValues } = await Swal.fire({
      title: 'Update your details',
      html: `
        <input id="swal-input1" placeholder='Enter new phone number' type='number' class="swal2-input">
        <input id="swal-input2" class="swal2-input">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value
        ];
      }
    });
    if (formValues) {
      console.log(formValues);
      
      Swal.fire(JSON.stringify(formValues));
    }
  }

  getToken() {
    this.token = localStorage.getItem('specialty_token') || '';
    this.getUserId();
  }

  getUserId() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.getUserDetails();
  }

  getUserDetails() {
    this.dataservice.getUser(this.userId).subscribe(res => {
      console.log(res);
      this.user = res.user[0];
    });
  }
}
