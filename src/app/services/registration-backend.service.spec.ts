import { TestBed } from '@angular/core/testing';

import { RegistrationBackendService } from './registration-backend.service';

describe('RegistrationBackendService', () => {
  let service: RegistrationBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
