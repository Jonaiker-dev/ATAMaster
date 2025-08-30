import { TestBed } from '@angular/core/testing';

import { ApiDriveService } from './api-drive.service';

describe('ApiDriveService', () => {
  let service: ApiDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
