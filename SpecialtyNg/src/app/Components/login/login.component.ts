import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

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
  displaySuccess(msg: string, route: string){
    this.loginForm.reset();
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
        if(res.success){
          
          this.authservice.checkUserDetails(res.token).subscribe(response => {
            console.log(response);
            if(response.info.role ==='user'){
              this.displaySuccess(res.success, '/user-dashboard/home')
              this.saveToken(res.token);
            } else if(response.info.role === 'specialist'){
              this.saveToken(res.token);
              this.displaySuccess(res.success, '/specialist-dashboard')
            } else if(response.info.isAdmin) {
              this.saveToken(res.token);
              this.displaySuccess(res.success, '/admin-dashboard')
            } else if(response.info.role === 'NULL') {}
          })
        } else if(res.error){
          this.displayError(res.error)
        }
      })
    } else if (!this.loginForm.valid){
      this.displayError('Please fill in all the fields correctly')
    }
  }
}
