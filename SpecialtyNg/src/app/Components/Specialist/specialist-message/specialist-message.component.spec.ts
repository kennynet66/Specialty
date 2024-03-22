import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistMessageComponent } from './specialist-message.component';

describe('SpecialistMessageComponent', () => {
  let component: SpecialistMessageComponent;
  let fixture: ComponentFixture<SpecialistMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialistMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
