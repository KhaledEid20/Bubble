import { TestBed } from '@angular/core/testing';

import { AsideTogglerService } from './aside-toggler.service';

describe('AsideTogglerService', () => {
  let service: AsideTogglerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsideTogglerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
