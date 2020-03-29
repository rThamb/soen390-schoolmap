import { TestBed } from '@angular/core/testing';
import { Building } from '../../models/Building';
import { BuildingFactoryService } from './building-factory.service';

describe('BuildingFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [BuildingFactoryService]
  }).compileComponents());

  it('should be created', () => {
    const service: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    expect(service).toBeTruthy();
  });


  it('should properly create a Hall building instance with values extracted from the JSON', async () => {
    const buildingFactory: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    let  building: Building = await buildingFactory.loadBuilding('HB');

    
  });

});
