import { TestBed } from '@angular/core/testing';

import { GpsGridMappingService } from './gps-grid-mapping.service';

describe('GpsGridMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);
    expect(service).toBeTruthy();
  });
});
