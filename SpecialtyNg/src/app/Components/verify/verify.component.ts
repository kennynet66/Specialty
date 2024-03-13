import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {

  userId!: string;

  visible = true;
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
      setTimeout(() => {
        this.router.navigate(['/details']);
      }, 2000);
    }
  })
}

}
