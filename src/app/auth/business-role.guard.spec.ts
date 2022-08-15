import { TestBed } from '@angular/core/testing';

import { BusinessRoleGuard } from './business-role.guard';

describe('BusinessRoleGuard', () => {
  let guard: BusinessRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BusinessRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
