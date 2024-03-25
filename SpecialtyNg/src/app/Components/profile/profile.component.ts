import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Interfaces/user.Interface';
import { DataService } from '../../Services/data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Industry } from '../../Interfaces/data.Interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  industryArr: Industry[] = [];

  user: User = {} as User;
  userId!: string;
  token!: string;

  visible = false;

  updateForm!: FormGroup 

  openUpdateForm(){
    this.visible = true
  }

  closeUpdateform(){
    this.visible = false
  }

  constructor(
    private dataservice: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
    this.updateForm = this.fb.group({
      gender: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      about: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      bankAcNo: ['', [Validators.required, Validators.min(0)]],
      bankAcName: ['', [Validators.required]],
      rate: ['', [Validators.required]]
    })
    this.getIndustries();
  }

  ngOnInit(): void {
    this.getToken();
  }

  getIndustries() {
    this.dataservice.getAllIndustries().subscribe(res => {
      // console.log(res);

      if (res.industries) {
        res.industries.forEach(industry => { this.industryArr.push(industry) })
      }
    })
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
