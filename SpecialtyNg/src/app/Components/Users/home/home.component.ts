import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Specialist } from '../../../Interfaces/data.Interface';
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
  constructor(private dataservice: DataService){
    this.getAllSpecialists();
  }

  getAllSpecialists(){
    this.dataservice.getAllSpecialists().subscribe(res => {
      res.specialists.forEach(specialist => {
        this.specialistsArr.push(specialist)
      })
    })
  }
}
