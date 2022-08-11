import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListDetailsComponent } from './appointment-list-details.component';

describe('AppointmentListDetailsComponent', () => {
  let component: AppointmentListDetailsComponent;
  let fixture: ComponentFixture<AppointmentListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
