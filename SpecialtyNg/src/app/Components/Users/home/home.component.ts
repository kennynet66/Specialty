import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Industry, Specialist } from '../../../Interfaces/data.Interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  specialistsArr: Specialist[] = [];
  copyArr: Specialist[] = [];
  
  industryArr: Industry[] = [];
  getIndustries() {
    this.dataservice.getAllIndustries().subscribe(res => {
      // console.log(res);

      if (res.industries) {
        res.industries.forEach(industry => { this.industryArr.push(industry) })
      }
    })
  }

  filterIndustry(industryName: string) {
    this.specialistsArr.find(specialists => {
      console.log(specialists);
      
      return specialists
    })
    // this.specialistsArr.filter(specialists => {
    //   if(specialists.industryName === industryName){
    //     console.log(specialists);
        
    //     this.copyArr = [];
    //     return this.copyArr.push(specialists)
    //   }
    // })
  }
  constructor(private dataservice: DataService){
    this.getAllSpecialists();
    this.getIndustries();
  }

  getAllSpecialists(){
    this.dataservice.getAllSpecialists().subscribe(res => {
      res.specialists.forEach(specialist => {
        this.copyArr.push(specialist)
        this.specialistsArr.push(specialist)
      })
    })
  }
}
