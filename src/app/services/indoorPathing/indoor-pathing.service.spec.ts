import { TestBed } from '@angular/core/testing';

import { IndoorPathingService } from './indoor-pathing.service';

describe('IndoorPathingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndoorPathingService = TestBed.get(IndoorPathingService);
    expect(service).toBeTruthy();
  });
});
