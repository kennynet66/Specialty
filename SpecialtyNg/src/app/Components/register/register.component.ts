import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router){
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  registerUser(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.displayError('Please fill in all fields correctly')
    }
  }
}
{}
