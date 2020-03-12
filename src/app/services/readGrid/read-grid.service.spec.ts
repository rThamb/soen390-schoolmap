import { TestBed } from '@angular/core/testing';
import { Location } from '../../models/Location'
import { Floor } from '../../models/Floor'

import { ReadGridService } from './read-grid.service';

describe('ReadGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ReadGridService]
  }).compileComponents());

  it('should be created', () => {
    const service: ReadGridService = TestBed.get(ReadGridService);
    expect(service).toBeTruthy();
  });

  it('should read json file and convert it to Floor object', async () => {
    const service: ReadGridService = TestBed.get(ReadGridService);

    let expectedFloor = new Floor();
    let topLeft = new Location(45.497163, -73.579545, 0);
    let topRight = new Location(45.497709, -73.579038, 0);
    let bottomLeft = new Location(45.496835, -73.578855, 0);
    let bottomRight = new Location(45.497373, -73.578342, 0);

    expectedFloor.topLeftCornerGPS = topLeft; 
    expectedFloor.topRightCornerGPS = topRight;
    expectedFloor.bottomLeftCornerGPS = bottomLeft;
    expectedFloor.bottomRightCornerGPS = bottomRight;
    expectedFloor.pathfindingFloorGrid = [
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1]
    ];
    expectedFloor.pointsOfInterest = {"H840": {"x": 2,"y": 5 }, 
                              "H890": { "x": 16,"y": 9} 
                             };

    let obtainedFloor: Floor = await service.createGrid('H8');
    console.log(obtainedFloor);
    expect(obtainedFloor).toEqual(expectedFloor);
  });
});
