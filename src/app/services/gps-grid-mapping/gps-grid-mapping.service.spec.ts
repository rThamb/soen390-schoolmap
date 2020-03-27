import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TestBed } from '@angular/core/testing';
import { Location } from '../../models/Location'
import { Floor } from '../../models/Floor';
import { GpsGridMappingService } from './gps-grid-mapping.service';

describe('GpsGridMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GpsGridMappingService,Geolocation]
  }).compileComponents());

  it('should be created', () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);
    let result = service != null; 
    expect(service).toBeTruthy();
  });

  
  // it('should determine GPS and Coordinate',  () => {
  //   const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);
  //
  //   let coor = new Location(6.4, 4, 0);
  //   let floor = new Floor();
  //   let topLeft = new Location(4.4, 0, 0);
  //   let topRight = new Location(12.4, 0, 0);
  //   let bottomLeft = new Location(4.2, 6, 0);
  //
  //   let map = [];
  //   let arr = [0,0,0,0,0]
  //   map.push(arr);
  //   map.push(arr);
  //   map.push(arr);
  //
  //   // floor.pathfindingFloorGrid = map;
  //   // floor.topLeftCornerGPS = topLeft;
  //   // floor.topRightCornerGPS = topRight;
  //   // floor.bottomLeftCorrnerGPS = bottomLeft;
  //
  //   let obtained = service.getFloorGridCoordinate(coor, floor);
  //   console.log(obtained);
  //   let expected = 1 + "," + 2;
  //   //console.log(result)
  //
  //   expect(obtained + "").toContain(expected + "");
  // });


});
