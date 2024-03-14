import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {

  userId!: string;

  visible = true;
  visible1 = false;
  message!: string;

  error = false;
constructor(private route: ActivatedRoute, private authservice: AuthService, private router: Router){
  this.getUserId();
}

getUserId(){
  this.route.params.subscribe((params)=>{
    this.userId =params['id']
    setTimeout(() => {
      this.activateUser()
    }, 2000);
  })
}

activateUser(){
  this.authservice.validateUser(this.userId).subscribe(res =>{
    if(res.success){
      this.visible = false;
      this.visible1 = true;
      this.message = res.success;
      setTimeout(() => {
        this.router.navigate([`/details/${this.userId}`]);
      }, 2000);
    } else if(res.error){
      this.visible = false
      this.error = true;
      this.message = res.error;
    }
  })
}

}
