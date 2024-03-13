import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

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

  successDiv = false;
  errorDiv = false;

  roleForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      role: ['',[Validators.required]]
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
      console.log(this.roleForm.value);

    } else{
      this.displayErrors('Please select one')
    }
  }
}
