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

  it('should read json file and convert it to a dictionnary that contains floor objects', async () => {
    const service: ReadGridService = TestBed.get(ReadGridService);
  
    let expectedfloorsDictionnary = {};
    let expectedFloor = new Floor();
    let topLeft = new Location(45.497165, -73.579545, 0);
    let topRight = new Location(45.497709, -73.579038, 0);
    let bottomLeft = new Location(45.496829, -73.578850, 0);
    let bottomRight = new Location(45.497373, -73.578342, 0);
  
    expectedFloor.topLeftCornerGPS = topLeft;
    expectedFloor.topRightCornerGPS = topRight;
    expectedFloor.bottomLeftCornerGPS = bottomLeft;
    expectedFloor.bottomRightCornerGPS = bottomRight;
  
    expectedFloor.setFloorLevel(8);

  
    let poi =
    {
      "HB840": {
        "x": 1,
        "y": 5,
        "lat": 45.497114, 
        "lng": -73.579277
    }, 
     "HB890": {
        "x": 16,
        "y": 9,
        "lat": 45.497490,
        "lng": -73.578739
    },
    "HB832":{
        "x": 7,
        "y": 7,
        "lat": 45.497234,
        "lng": -73.579078
    },
    "Washroom-Men": {
        "x": 6, 
        "y" : 15,
        "lat": 45.497108, 
        "lng": -73.578827
    },
    "Washroom-Women": {
            "x": 12, 
            "y": 15,
            "lat": 45.497256, 
            "lng": -73.578683 
    },  
    "Escalator-Up": {
        "x": 9,
        "y": 11,
        "lat": 45.497257, 
        "lng": -73.578869
    }, 
    "Escalator-Down": {
        "x": 9,
        "y": 6,
        "lat": 45.497323,
        "lng": -73.579005
    }, 
    "Elevator" : {
        "x": 12, 
        "y": 11,
        "lat": 45.497314, 
        "lng": -73.578752
    },       
    "Stairs": [
        {
            "x": 4,
            "y": 15,
            "lat": 45.497054,
            "lng": -73.578849
        },
        {
            "x": 4,
            "y": 3,
            "lat": 45.497245,
            "lng": -73.579247
        } 
    ]
    }
    expectedFloor.pointsOfInterest = poi;
  
    let grid= [
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
      [1,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
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
  
  
    let tileGrid: FloorTile[][] = [];

    let length = grid.length;
    let width = grid[0].length;
    let arr = [];
    for(let i = 0; i < length; i++){
      arr = [];
      let currentRow = grid[i];
      for(let j = 0; j < width; j++){
        let num = currentRow[j];
        let tile = new FloorTile(null, num);
        arr.push(tile);
      }
      tileGrid.push(arr);
      arr = [];
    }
    expectedFloor.setFloorTileGrid(tileGrid);
  
    let keys = Object.keys(poi);
    let pois: IndoorPOI[] = [];

    for(let i =0; i<keys.length; i++){

      let key = keys[i];

      if(key != "Stairs"){
        let curPoint = poi[key];
        let obj = new IndoorPOI(curPoint["lat"], curPoint["lng"], curPoint["x"], curPoint["y"], key);
        pois.push(obj);
      }
      else{//handle stair POIS differently
        let stairsPois = poi[key]; //an array
        for(let i =0; i < stairsPois.length; i++){
          let curPoint = stairsPois[i];
          let obj = new IndoorPOI(curPoint["lat"], curPoint["lng"], curPoint["x"], curPoint["y"], key);
          pois.push(obj);
        }    
      }    
    }
  
    expectedFloor.setPois(pois);
    expectedfloorsDictionnary["HB8"] = expectedFloor;

    //set dimensions
    expectedFloor.setWidth(grid[0].length);
    expectedFloor.setHeight(grid.length);
  
    
    let obtainedFloorDictionnary: Floor = await service.createGrid('HB');
    console.log(obtainedFloorDictionnary);
    expect(obtainedFloorDictionnary["HB8"]).toEqual(expectedfloorsDictionnary["HB8"]);
  });

  it('buildingInfo should return a dictionary of info on that building', async () => {
    const service: ReadGridService = TestBed.get(ReadGridService);

    let expectedDictionary = {};
    let buildingContent =
    {
      "Name": "Henry F. Hall Building",
      "Address": "1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8",
      "Departments": ["Geography, Planning and Environment", "Political Science, Sociology and Anthropology, Economics", "School of Irish Studies"],
      "Services": ["Welcome Crew Office", "DB Clarke Theatre", "Dean of Students", "Aboriginal Student Resource Centre", "Concordia Student Union", "IT Service Desk", "Security Office", "Student Success Centre", "Mail Services", "Archives", "Career and Planning Services", "Sexual Assault Ressource Centre (SARC)"],
      "BuildingImg": "assets/BuildingImages/HallBuilding.jpg",
      "ImgWidth": "50%",
      "EnterButton": "true"
    }

    let floorNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    let bound =     
    {
      "north": 45.497735,
      "south": 45.496807,
      "east": -73.578316,
      "west": -73.579586 
    }

    let location =
    {
        "lat":45.497253,
        "lng":-73.578920
    }

    let floors =
    [
      {
        "level": 8,
        "img": "assets/FloorImages/Hall/hall-8.png",
        "topLeftLat": 45.497165, 
        "topLeftLong": -73.579545,
        "topRightLat": 45.497709, 
        "topRightLong": -73.579038,
        "bottomLeftLat": 45.496829, 
        "bottomLeftLong": -73.578850,
        "bottomRightLat": 45.497373, 
        "bottomRightLong": -73.578342,
        "binaryGrid": [
                        [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
                        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                        [1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
                        [1,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1],
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
                    ],
        "POI": {
            "HB840": {
                "x": 1,
                "y": 5,
                "lat": 45.497114, 
                "lng": -73.579277
            }, 
             "HB890": {
                "x": 16,
                "y": 9,
                "lat": 45.497490,
                "lng": -73.578739
            },
            "HB832":{
                "x": 7,
                "y": 7,
                "lat": 45.497234,
                "lng": -73.579078
            },
            "Washroom-Men": {
                "x": 6, 
                "y" : 15,
                "lat": 45.497108, 
                "lng": -73.578827
            },
            "Washroom-Women": {
                    "x": 12, 
                    "y": 15,
                    "lat": 45.497256, 
                    "lng": -73.578683 
            },  
            "Escalator-Up": {
                "x": 9,
                "y": 11,
                "lat": 45.497257, 
                "lng": -73.578869
            }, 
            "Escalator-Down": {
                "x": 9,
                "y": 6,
                "lat": 45.497323,
                "lng": -73.579005
            }, 
            "Elevator" : {
                "x": 12, 
                "y": 11,
                "lat": 45.497314, 
                "lng": -73.578752
            },       
            "Stairs": [
                {
                    "x": 4,
                    "y": 15,
                    "lat": 45.497054,
                    "lng": -73.578849
                },
                {
                    "x": 4,
                    "y": 3,
                    "lat": 45.497245,
                    "lng": -73.579247
                } 
            ]
            }
        },
    
        {
        "level": 9,
        "img": "assets/FloorImages/Hall/hall-9.png",
        "topLeftLat": 45.497165, 
        "topLeftLong": -73.579545,
        "topRightLat": 45.497709, 
        "topRightLong": -73.579038,
        "bottomLeftLat": 45.496829, 
        "bottomLeftLong": -73.578850,
        "bottomRightLat": 45.497373, 
        "bottomRightLong": -73.578342,
        "binaryGrid": [
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
                        [1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
                        [1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
                        [1,1,1,0,1,1,0,0,1,1,1,0,0,1,1,1,1,1,0,1],
                        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                        [1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
                        [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
                        [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
                        [1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1], 
                        [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
                        [1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1], 
                        [1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1],
                        [1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1],
                        [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
                        [1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                    ],
        "POI": {
            "HB967": {
                "x": 11,
                "y": 5,
                "lat": 0, 
                "lng": 0
            },
            "HB922": {
                "x": 3,
                "y": 16,
                "lat": 0, 
                "lng": 0
            },
            "Washroom-Men": {
                "x": 6, 
                "y" : 15,
                "lat": 45.497108, 
                "lng": -73.578827
            },
            "Washroom-Women": {
                    "x": 12, 
                    "y" : 15,
                    "lat": 45.497256, 
                    "lng": -73.578683 
            },
            "Escalator-Up": {
                "x": 10,
                "y": 7,
                "lat": 45.497323,
                "lng": -73.579005
            }, 
            "Escalator-Down": {
                "x": 10,
                "y": 11,
                "lat": 45.497257, 
                "lng": -73.578869
            },  
            "Elevator" : {
                "x": 12, 
                "y": 12,
                "lat": 45.497314, 
                "lng": -73.578752
            },     
            "Stairs": [
                {
                    "x": 4,
                    "y": 15,
                    "lat": 45.497054,
                    "lng": -73.578849
                },
                {
                    "x": 4,
                    "y": 3,
                    "lat": 45.497245,
                    "lng": -73.579247
                }
            ]
            }
        }
    
        ]
  


    expectedDictionary["BuildingContent"] = buildingContent;
    expectedDictionary["floorNames"] = floorNames;
    expectedDictionary["bound"] = bound;
    expectedDictionary["Location"] = location;
    expectedDictionary["Floors"] = floors;
    let obtainedDictionnary = await service.buildingInfo('HB');
    expect(obtainedDictionnary).toEqual(expectedDictionary);
  });
});
