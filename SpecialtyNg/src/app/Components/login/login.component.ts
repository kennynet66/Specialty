import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink, ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorDiv = false;
  successDiv = false;
  errorMsg!: string;
  successMsg!: string;

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

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService, private renderer: Renderer2, private el: ElementRef){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  saveToken(token: string){
    localStorage.setItem('specialty_token', token);
  }

  loginUser(){
    if(this.loginForm.valid){
      this.authservice.loginUser(this.loginForm.value).subscribe(res =>{
        console.log(res);
        
        if(res.success){
          
          this.authservice.checkUserDetails(res.token).subscribe(response => {
            console.log(response);
            if(response.info.role ==='user'){
              // this.displaySuccess(res.success, '/user-dashboard/home')
              this.showSuccess(res.success)
              setTimeout(() => {
                this.router.navigate(['/user-dashboard/home'])
              }, 2000);
              this.saveToken(res.token);
            } else if(response.info.role === 'specialist'){
              this.showSuccess(res.success)
              setTimeout(() => {
                this.router.navigate(['/specialist-dashboard/home'])
              }, 2000);
              this.saveToken(res.token);
            } else if(response.info.isAdmin) {
              this.showSuccess(res.success)
              setTimeout(() => {
                this.router.navigate(['/admin'])
              }, 2000);
              this.saveToken(res.token);
            } else if(response.info.role === 'NULL') {}
          })
        } else if(res.error){
          this.showError(res.error)
        }
      })
    } else if (!this.loginForm.valid){
      this.showError('Please fill in all the fields before submitting')
    }
  }
}
