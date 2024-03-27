import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Interfaces/user.Interface';
import { DataService } from '../../Services/data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Industry, countriesApiResponse } from '../../Interfaces/data.Interface';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, SearchPipe ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  industryArr: Industry[] = [];
  countriesArr: countriesApiResponse[] = [];
  filter = '';
  country=''

  user: User = {} as User;
  userId!: string;
  token!: string;

  visible = false;
  dropArea = false;

  updateForm!: FormGroup ;

  openDropArea(){
    this.dropArea = true
  }

  closeDropArea(){
    this.dropArea = false
  }

  openUpdateForm(){
    this.visible = true
  }

  closeUpdateform(){
    this.visible = false
  }

  updateProfileImage(){
    
    if(this.imageForm.valid){
      this.dataservice.updateProfileImage(this.userId, this.imageForm.value).subscribe(res => {
        if(res.success){
          this.showSuccess(res.success)
          this.getUserDetails()
          this.closeDropArea();
        }
      })
    } else if(!this.imageForm.valid){
      this.showError('Please upload an image')
    }    
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

    this.imageForm = this.fb.group({
      image: ['', Validators.required]
    })

    this.getIndustries();
    this.getAllCountries();
  }

  async getAllCountries(){
    const res =  await fetch('https://api.countrystatecity.in/v1/countries', {
      headers: {
        "X-CSCAPI-KEY": "bGM2ZzRGZm4xRzhnTzJkdmxkWEtlY2ROMmh3S1BYWXRsUWxTenVJYg=="
      },
      method: 'GET'
    })

    const data = await res.json()

    data.forEach((data: countriesApiResponse) => {
      this.countriesArr.push(data)
    })
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

  updateDetails(){
    if(this.updateForm.valid){
      this.dataservice.updateUser(this.updateForm.value, this.userId).subscribe(res => {
        if (res.success){
          this.visible = false
          this.showSuccess(res.success)
          this.getUserDetails()
        }
      })
    } else if(this.updateForm){
      this.showError('Please fill in all the fields correctly')
    }
  }

  getUserDetails() {
    this.dataservice.getUser(this.userId).subscribe(res => {
      console.log(res);
      this.user = res.user[0];
      this.updateForm.patchValue({
        gender: this.user.gender,
        DOB: this.user.DOB,
        about: this.user.about,
        industry: this.user.industry,
        country: this.user.country,
        city: this.user.city,
        phoneNumber: this.user.phoneNumber,
        rate: this.user.rate,
        bankAcNo: this.user.bankAcNo,
        bankAcName: this.user.bankAcName
      })
    });
  }

  imageForm!: FormGroup
  imgUrl!: string

  async uploadImage(event: any){
        
    const target = event.target
    const files = target.files
    if(files){
        console.log(files)
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "specialtyImageUploads")
        formData.append("cloud_name", "dtvrzfi1b")
  
          console.log(formData);
          await fetch('https://api.cloudinary.com/v1_1/dtvrzfi1b/image/upload', {
            method: "POST",
            body: formData
          }).then(
            (res:any) => {
              return res.json()  
            },
          ).then(data=>{
            console.log("this is the URL",data.url);
            this.imageForm.get('image')?.setValue(data.url)
            this.updateProfileImage()
            return data.url = this.imgUrl;
            
          }
          );
  
    }
  
  }
  
}
