import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSpecialistComponent } from './single-specialist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SingleSpecialistComponent', () => {
  let component: SingleSpecialistComponent;
  let fixture: ComponentFixture<SingleSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSpecialistComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: of({id: "jhfc7tevuycw3yvegweiuhwjj9fj"})
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
