import { TestBed } from '@angular/core/testing';

import { BuildingFactoryService } from './building-factory.service';

describe('BuildingFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    expect(service).toBeTruthy();
  });
});
