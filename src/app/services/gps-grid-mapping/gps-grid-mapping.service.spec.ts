import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TestBed } from '@angular/core/testing';
import { Location } from '../../models/Location';
import { Floor } from '../../models/Floor';
import { GpsGridMappingService } from './gps-grid-mapping.service';

describe('GpsGridMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GpsGridMappingService, Geolocation]
  }).compileComponents());

  it('should be created', () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);
    const result = service != null;
    expect(service).toBeTruthy();
  });


  it('should determine GPS and Coordinate',  () => {
     const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);

     const coor = new Location(6.4, 4, 0);
     const floor = new Floor();
     const topLeft = new Location(4.4, 0, 0);
     const topRight = new Location(12.4, 0, 0);
     const bottomLeft = new Location(4.2, 6, 0);

     const map = [];
     const arr = [0, 0, 0, 0, 0];
     map.push(arr);
     map.push(arr);
     map.push(arr);

     floor.pathfindingFloorGrid = map;
     floor.topLeftCornerGPS = topLeft;
     floor.topRightCornerGPS = topRight;
     floor.bottomLeftCornerGPS = bottomLeft;

     const obtained = service.getFloorGridCoordinate(coor, floor);
     console.log(obtained);
     const expected = 1 + ',' + 2;
     console.log(result);

     expect(obtained + '').toContain(expected + '');
   });


});
