import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSpecialistComponent } from './single-specialist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SingleSpecialistComponent', () => {
  let component: SingleSpecialistComponent;
  let fixture: ComponentFixture<SingleSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSpecialistComponent, HttpClientTestingModule]
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
