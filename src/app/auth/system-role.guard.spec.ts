import { TestBed } from '@angular/core/testing';

import { SystemRoleGuard } from './system-role.guard';

describe('SystemRoleGuard', () => {
  let guard: SystemRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SystemRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
