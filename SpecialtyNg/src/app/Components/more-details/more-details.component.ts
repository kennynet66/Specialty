import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../Services/data.service';
import { Industry, countriesApiResponse } from '../../Interfaces/data.Interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-more-details',
  standalone: true,
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, SearchPipe],
  templateUrl: './more-details.component.html',
  styleUrl: './more-details.component.css'
})
export class MoreDetailsComponent {
  industryArr: Industry[] = [];
  countriesArr: countriesApiResponse[] = [];
  
  moreDetailsForm!: FormGroup;
  userId!: string;
  errorDiv = false;
  successDiv = false;
  errorMsg!: string;
  successMsg!: string;
  filter = '';
  displaySuccess(msg: string, route: string) {
    this.moreDetailsForm.reset();
    this.successMsg = msg
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate([route])
    }, 2000);
  };
  displayError(msg: string) {
    this.errorMsg = msg,
      this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false;
    }, 2000);
  };
  getUserId() {
    this.route.params.subscribe((params) => {
      this.userId = params['id']
      setTimeout(() => {
      }, 2000);
    })
  }

  constructor(private dataservice: DataService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.getIndustries()
    this.moreDetailsForm = this.fb.group({
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
    this.getUserId();
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

    console.log("Response", this.countriesArr);
    
  }

  getIndustries() {
    this.dataservice.getAllIndustries().subscribe(res => {
      // console.log(res);

      if (res.industries) {
        res.industries.forEach(industry => { this.industryArr.push(industry) })
      }
    })
  }

  updatedetails() {
    if (this.moreDetailsForm.valid) {
      this.dataservice.updateUser(this.moreDetailsForm.value, this.userId).subscribe(res => {
        console.log(res);

        if (res.success) {
          this.router.navigate(['/specialist-dashboard'])
        }
      })

    } else if(!this.moreDetailsForm.valid) {
      this.displayError('Please fill in the fields correctly')
    }

  }
}
