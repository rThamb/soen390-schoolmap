import { TestBed } from '@angular/core/testing';
import { Location } from '../../models/Location'
import { Floor } from '../../models/Floor'
import { FloorTile } from '../../models/FloorTile'
import { IndoorPOI } from '../../models/IndoorPOI'
import { ReadGridService } from './read-grid.service';

describe('ReadGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ReadGridService]
  }).compileComponents());

  it('should be created', () => {
    const service: ReadGridService = TestBed.get(ReadGridService);
    expect(service).toBeTruthy();
  });

  // it('should read json file and convert it to a dictionnary that contains floor objects', async () => {
  //   const service: ReadGridService = TestBed.get(ReadGridService);
  
  //   let expectedfloorsDictionnary = {};
  //   let expectedFloor = new Floor();
  //   let topLeft = new Location(45.497165, -73.579545, 0);
  //   let topRight = new Location(45.497709, -73.579038, 0);
  //   let bottomLeft = new Location(45.496829, -73.578850, 0);
  //   let bottomRight = new Location(45.497373, -73.578342, 0);
  
  //   expectedFloor.topLeftCornerGPS = topLeft;
  //   expectedFloor.topRightCornerGPS = topRight;
  //   expectedFloor.bottomLeftCornerGPS = bottomLeft;
  //   expectedFloor.bottomRightCornerGPS = bottomRight;
  
  //   expectedFloor.setFloorLevel(8);

  
  //   let poi =
  //   {
  //     "HB840": {
  //       "x": 1,
  //       "y": 5,
  //       "lat": 45.497386,
  //       "lng": -73.578535
  //   },
    
  //    "HB890": {
  //       "x": 16,
  //       "y": 9,
  //       "lat": 45.497097,
  //       "lng": -73.579132
  //   },    
  //   "HB832":{
  //     "x": 7,
  //     "y": 7,
  //     "lat": 45.497234,
  //     "lng": -73.579078
  // },
  //   "Washroom-Men": {
  //       "x": 6,
  //       "y" : 15,
  //       "lat": 0,
  //       "lng": 0
  //   },

  //   "Washroom-Women": {
  //           "x": 9,
  //           "y": 3,
  //           "lat": 0,
  //           "lng": 0
  //   },
  //   "Escalator-Up": {
  //       "x": 9,
  //       "y": 11,
  //       "lat": 0,
  //       "lng": 0
  //   },
  //   "Escalator-Down": {
  //       "x": 9,
  //       "y": 6,
  //       "lat": 0,
  //       "lng": 0
  //   },
  //   "Elevator" : {
  //       "x": 12,
  //       "y": 11,
  //       "lat": 0,
  //       "lng": 0
  //   },
  //   "Stairs": [
  //       {
  //           "x": 4,
  //           "y": 15,
  //           "lat": 0,
  //           "lng": 0
  //       },
  //       {
  //           "x": 4,
  //           "y": 3,
  //           "lat": 0,
  //           "lng": 0
  //       }
  //   ]
  //   }
  //   expectedFloor.pointsOfInterest = poi;
  
  //   let binaryGrid= [
  //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
  //     [1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
  //     [1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
  //     [1,1,1,0,1,1,0,0,1,1,1,0,0,1,1,1,1,1,0,1],
  //     [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  //     [1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1], 
  //     [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1], 
  //     [1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1],
  //     [1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1],
  //     [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  //     [1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  //   ];
  
  //        //set dimensions
  //        expectedFloor.setWidth(binaryGrid[0].length);
  //        expectedFloor.setHeight(binaryGrid.length);
  //   let floorPlan: FloorTile[][] = [];
  
  
  //   let length = binaryGrid.length;
  //   let width = binaryGrid[0].length;
  //   let arr = [];
  //   for(let i = 0; i < length; i++){
  //     arr = [];
  //     let currentRow = binaryGrid[i];
  //     for(let j = 0; j < width; j++){
  //       let num = currentRow[j];
  //       let tile = new FloorTile(null, num);
  //       arr.push(tile);
  //     }
  //     floorPlan.push(arr);
  //     arr = [];
  //   }
  //   expectedFloor.setFloorTileGrid(floorPlan);
  
  
  //   let keys = Object.keys(poi);
  //   let pois: IndoorPOI[] = [];
  
  //   for(let i =0; i<keys.length; i++){
  
  //     let key = keys[i];
  
  //     if(key != "Stairs"){
  //       let curPoint = poi[key];
  //       let obj = new IndoorPOI(curPoint["lat"], curPoint["lng"], curPoint["x"], curPoint["y"], key);
  //       pois.push(obj);
  //     }
  //     else{
  //       let stairsPois = poi[key];
  //       for(let i =0; i < stairsPois.length; i++){
  //         let curPoint = stairsPois[i];
  //         let obj = new IndoorPOI(curPoint["lat"], curPoint["lng"], curPoint["x"], curPoint["y"], key);
  //         pois.push(obj);
  //       }
  //     }
  //   }
  
  //   expectedFloor.setPois(pois);
  
  //   expectedfloorsDictionnary["HB8"] = expectedFloor;
  //   let obtainedFloorDictionnary: Floor = await service.createGrid('HB');
  //   console.log(obtainedFloorDictionnary);
  //   expect(obtainedFloorDictionnary["HB8"]).toEqual(expectedfloorsDictionnary["HB8"]);
  // });
});
