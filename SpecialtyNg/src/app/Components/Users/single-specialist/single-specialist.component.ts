import { Component, Input, input } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Specialist } from '../../../Interfaces/data.Interface';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { oneReview } from '../../../Interfaces/reviews.Interface';


@Component({
  selector: 'app-single-specialist',
  standalone: true,
  imports: [ CommonModule, RouterLink, ReactiveFormsModule ],
  templateUrl: './single-specialist.component.html',
  styleUrl: './single-specialist.component.css'
})
export class SingleSpecialistComponent {

  specialistId!: string;
  specialist: Specialist[] = [];
  visible = false;
  reviewForm!: FormGroup;
  userId!: string;
  reviewsArr: oneReview[] = [];

  getUserId(){
    const token: string = localStorage.getItem('specialty_token') as string

    this.authservice.checkUserDetails(token).subscribe(res => {
      this.userId = res.info.userId
    })
  }

  openReview(){
    this.visible = true
  }

  showSuccess(msg: string){
    Swal.fire({
      title: "Success",
      text: msg,
      icon: "success"
    });
  }

  showError(msg: string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
    });
  }


  closeReview(){
    this.visible = false
  }
  getId(){
    this.route.params.subscribe(params => {
      this.specialistId = params['id'];
    })
    this.getUserId();
    this.getSpecialistDetails();
    this.getReviews();
  }
  constructor(private dataservice: DataService, private route: ActivatedRoute, private fb: FormBuilder, private authservice: AuthService){
    this.reviewForm = this.fb.group({
      review: ['', Validators.required]
    })
    this.getId()
  }

  getReviews(){
    this.dataservice.getReviews(this.specialistId).subscribe(res => {
      console.log(res);
      
      res.reviews.forEach(review => {
        this.reviewsArr.push(review)
      })
    })
  }

  createReview(){
    console.log(this.userId);
    
    if(this.reviewForm.valid){
      this.dataservice.createReview(this.userId, this.specialistId, this.reviewForm.value).subscribe(res => {
        if(res.success){
          this.reviewsArr = []
          this.getReviews()
          this.reviewForm.reset();
          this.visible = false
          this.showSuccess(res.success);
        }
      })
    } else if(!this.reviewForm.valid) {
      this.showError('Please fill in all the fields correctly')
    }
  }

  getSpecialistDetails(){
    this.dataservice.getOneSpecialist(this.specialistId).subscribe(res =>{
      res.specialists.forEach(specialist => {
        this.specialist.push(specialist)
      })
    })
  }
}
