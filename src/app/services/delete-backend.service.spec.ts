import { TestBed } from '@angular/core/testing';

import { DeleteBackendService } from './delete-backend.service';

describe('DeleteBackendService', () => {
  let service: DeleteBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
