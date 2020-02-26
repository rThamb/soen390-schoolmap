import { TestBed } from '@angular/core/testing';
import { Coordinate } from '../../models/Coordinate'
import { Floor } from '../../models/Floor'


import { GpsGridMappingService } from './gps-grid-mapping.service';

describe('GpsGridMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GpsGridMappingService]
  }).compileComponents());

  it('should be created', () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);
    let result = service != null; 
    expect(service).toBeTruthy();
  });

  
  it('should determine GPS and Coordinate', () => {
    const service: GpsGridMappingService = TestBed.get(GpsGridMappingService);

    let coor = new Coordinate(6.4, 4);
    let floor = new Floor();
    let topLeft = new Coordinate(4.4, 0);
    let topRight = new Coordinate(12.4, 0);
    let bottomLeft = new Coordinate(4.2, 6);

    let map = [];
    let arr = [0,0,0,0,0]
    map.push(arr);
    map.push(arr);
    map.push(arr);

    floor.pathfindingFloorGrid = map;
    floor.topLeftCornerGPS = topLeft; 
    floor.topRightCornerGPS = topRight;
    floor.bottomLeftCorrnerGPS = bottomLeft;
    
    let obtained:string = service.getFloorGridCoordinate(coor, floor);
    let expect:string = 2 + "," + 3;
    let result = obtained == expect; 
    //console.log(result)
    
    expect('2,4').toContain('2,3');
  });


});
