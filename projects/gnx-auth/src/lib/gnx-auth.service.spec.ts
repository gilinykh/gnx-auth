import { TestBed } from '@angular/core/testing';

import { GnxAuthService } from './gnx-auth.service';

describe('GnxAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GnxAuthService = TestBed.get(GnxAuthService);
    expect(service).toBeTruthy();
  });
});
