import { TestBed } from '@angular/core/testing';

import { RpiService } from './rpi.service';

describe('RpiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RpiService = TestBed.get(RpiService);
    expect(service).toBeTruthy();
  });
});
