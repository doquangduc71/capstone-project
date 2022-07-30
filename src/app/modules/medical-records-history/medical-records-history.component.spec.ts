import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordsHistoryComponent } from './medical-records-history.component';

describe('MedicalRecordsHistoryComponent', () => {
  let component: MedicalRecordsHistoryComponent;
  let fixture: ComponentFixture<MedicalRecordsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalRecordsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
