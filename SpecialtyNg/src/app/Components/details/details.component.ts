import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, FooterComponent ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  successMsg!: string;
  errorMsg!: string;

  userId!: string;

  successDiv = false;
  errorDiv = false;

  roleForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private dataservice: DataService) {
    this.roleForm = this.fb.group({
      role: ['',[Validators.required]]
    })
    this.getUserId()
  }

  getUserId(){
    this.route.params.subscribe((params)=>{
      this.userId =params['id']
    })
  }

  displayErrors(msg:string){
    this.errorMsg = msg;
    this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }

  selectRole(){
    if(this.roleForm.valid){
      this.dataservice.setRole(this.userId, this.roleForm.value).subscribe(res =>{
        if(res.success){
          this.router.navigate([`more-details/${this.userId}`])
        }
      })
    } else{
      this.displayErrors('Please select one')
    }
  }
}
