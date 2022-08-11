import { TestBed } from '@angular/core/testing';

import { NotiDialogService } from './noti-dialog.service';

describe('NotiDialogService', () => {
  let service: NotiDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotiDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
