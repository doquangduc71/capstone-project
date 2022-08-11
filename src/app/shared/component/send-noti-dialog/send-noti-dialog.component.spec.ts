import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotiDialogComponent } from './send-noti-dialog.component';

describe('SendNotiDialogComponent', () => {
  let component: SendNotiDialogComponent;
  let fixture: ComponentFixture<SendNotiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNotiDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNotiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
