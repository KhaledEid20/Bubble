import { TestBed } from '@angular/core/testing';

import { RegisterationStatusService } from './registeration-status.service';

describe('RegisterationStatusService', () => {
  let service: RegisterationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
