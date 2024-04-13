import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistHomeComponent } from './specialist-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SpecialistHomeComponent', () => {
  let component: SpecialistHomeComponent;
  let fixture: ComponentFixture<SpecialistHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistHomeComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
