import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../../Services/data.service';
import { Industry, countriesApiResponse } from '../../Interfaces/data.Interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ NavbarComponent, FooterComponent,CommonModule, FormsModule ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  industryArr: Industry[] = [];
  constructor(private dataservice: DataService){
    this.getAllIndustries();
    
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
