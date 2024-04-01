import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ NavbarComponent, CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMsg!: string;
  successMsg!: string;
  errorDiv= false;
  successDiv = false
  registerForm!: FormGroup;

  showSuccess(msg: string) {
    Swal.fire({
      icon: 'success',
      title: msg,
      timerProgressBar: true,
      timer: 2000,
      showConfirmButton: false
    })
  }

  showError(msg:string){
    Swal.fire({
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })
  }

  displaySuccess(msg: string, route: string){
    this.successMsg = msg
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate([route])
    }, 2000);
  };
  displayError(msg: string){
    this.errorMsg = msg,
    this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false;
    }, 2000);
  };

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService){
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  registerUser(){
    if(this.registerForm.valid){
      this.authservice.registerUser(this.registerForm.value).subscribe(res =>{
        if(res.success){
          this.showSuccess(res.success)
          setTimeout(() => {
            this.router.navigate(['/verify-email'])
          }, 2000);
        } else if (res.error) {
          this.showError(res.error)
        }
      })
    } else {
      this.showError('Please fill in all fields before submitting')
    }
  }
}

