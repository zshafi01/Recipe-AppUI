import { TestBed } from '@angular/core/testing';

import { UpdateBackendService } from './update-backend.service';

describe('UpdateBackendService', () => {
  let service: UpdateBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
