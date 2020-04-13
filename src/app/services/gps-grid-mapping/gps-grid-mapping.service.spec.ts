import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TestBed } from '@angular/core/testing';
import { Location } from '../../models/Location'
import { Floor } from '../../models/Floor';
import { GpsGridMappingService } from './gps-grid-mapping.service';
import { GridCoordinate } from '../../models/GridCoordinate';
import { BuildingFactoryService } from '../BuildingFactory/building-factory.service';
import { Building } from '../../models/Building';

describe('GpsGridMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GpsGridMappingService, BuildingFactoryService, Geolocation]
  }).compileComponents());

  it('should be created', () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);
    expect(service).toBeTruthy();
  });

  
  it('should return correct grid coordinate in hall building based on user location', async () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);
    const bFact: BuildingFactoryService = TestBed.get(BuildingFactoryService);

    let userLocation: Location = new Location(45.497095, -73.579206, 0);
    let floor8: Floor;
    
    let building: Building = await bFact.loadBuilding("HB");
    floor8 = building.getFloors()['HB8'];
    
    expect(service.getFloorGridCoordinate(userLocation, floor8)).toEqual(new GridCoordinate(2,7));
  });

  it('should return a Location object', () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);

    const location = service.getUserCurrentPosition();

    expect(location).toBeDefined();
  });




  


});
