import { TestBed } from '@angular/core/testing';

import { ReadGridService } from './read-grid.service';

describe('ReadGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadGridService = TestBed.get(ReadGridService);
    expect(service).toBeTruthy();
  });
});
