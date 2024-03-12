import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ NavbarComponent, FooterComponent,CarouselModule ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
