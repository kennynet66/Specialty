import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Specialist } from '../../../Interfaces/data.Interface';
import { CommonModule } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3900', options: {} };

@Component({
  selector: 'app-single-specialist',
  standalone: true,
  imports: [ CommonModule, SocketIoModule ],
  templateUrl: './single-specialist.component.html',
  styleUrl: './single-specialist.component.css'
})
export class SingleSpecialistComponent {
  specialistId!: string;
  specialist: Specialist[] = []
  getId(){
    this.route.params.subscribe(params => {
      this.specialistId = params['id'];
    })
    this.getSpecialistDetails()
  }
  constructor(private dataservice: DataService, private route: ActivatedRoute){
    this.getId()
  }

  getSpecialistDetails(){
    this.dataservice.getOneSpecialist(this.specialistId).subscribe(res =>{
      console.log(res);
      
      res.specialists.forEach(specialist => {
        this.specialist.push(specialist)
      })
    })
  }
}
