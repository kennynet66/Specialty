import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../Services/data.service';
import { Industry, countriesApiResponse } from '../../Interfaces/data.Interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ NavbarComponent, FooterComponent,CommonModule, FormsModule, SearchPipe ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  industryArr: Industry[] = [];
  countriesArr: countriesApiResponse[] = [];

  filter = '';
  constructor(private dataservice: DataService){
    this.getAllIndustries();
    this.getAllCountries()
    
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


  getAllIndustries(){
    this.dataservice.getAllIndustries().subscribe(res =>{
      if(res.industries){
        res.industries.forEach(industry =>{
          this.industryArr.push(industry)
        })
      }
    })
  }
}
