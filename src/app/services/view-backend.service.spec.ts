import { TestBed } from '@angular/core/testing';

import { ViewBackendService } from './view-backend.service';

describe('ViewBackendService', () => {
  let service: ViewBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
