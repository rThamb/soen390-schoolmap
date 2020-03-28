import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TestBed } from '@angular/core/testing';
import { IndoorPathingService } from './indoor-pathing.service';
import { ReadGridService } from '../readGrid/read-grid.service';
import { Floor } from '../../models/Floor' 
import { BuildingFactoryService} from '../BuildingFactory/building-factory.service'

import { Location } from  '../../models/Location' 
import { Building } from  '../../models/Building' 
import { Transitions } from  '../../models/Transitions' 

//Help functions

//utility functions
var testValues = function(arrObtain){

  let str = "let expected = [";

  for(var i = 0; i < arrObtain.length; i++){

    let curLoc: Location = arrObtain[i];
    let entry = "'" + curLoc.getLat() + "," + curLoc.getLng() + "',";
    str = str.concat(entry);
  }
  str = str.concat("];");
  return str;
}; 

var resultChecker = function(obtained, expected){

  if(obtained.length != expected.length){
    console.log("Not same size");
    return false;
  }

  for(var i = 0; i < obtained.length; i++){
    let curLoc: Location = obtained[i];
    let entry = curLoc.getLat() + "," + curLoc.getLng();
    let expect = expected[i];

    if(!(entry === expect))
      return false;
  }
  return true;
}




describe('IndoorPathingService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ReadGridService, IndoorPathingService,Geolocation, BuildingFactoryService]
  }).compileComponents());

  it('should be created', () => {   
    const service: IndoorPathingService = TestBed.get(IndoorPathingService);
    console.log("Checking instance");
    expect(service).toBeTruthy();
  });
  
  it('should determine shortest path to HB840 to HB890', async () => {

    //get handles to service
    const indoorService: IndoorPathingService = TestBed.get(IndoorPathingService);
    const buildingService: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    const buildKey = "HB";

    let start: string = "HB840";
    let end: string = "HB890";
    let building: Building = await buildingService.loadBuilding(buildKey);
    let startFloor: Floor = await building.getFloorLevel("8");
    let transition: Transitions = Transitions.Escalator;

    let expected = [

    "45.49712451578947,-73.57927763355264", "45.49715171578948,-73.57925228355263",
    "45.497178915789476,-73.57922693355263","45.4971966,-73.57926351249999", 
    "45.49721428421053,-73.57930009144737", "45.49724148421053,-73.57927474144736",
    "45.497268684210525,-73.57924939144736","45.49729588421053,-73.57922404144736",
    "45.49732308421053,-73.57919869144737","45.497350284210526,-73.57917334144737",
    "45.497377484210524,-73.57914799144737","45.49740468421053,-73.57912264144737",
    "45.49743188421053,-73.57909729144737", "45.497459084210526,-73.57907194144737",
    "45.497486284210524,-73.57904659144737","45.49751348421053,-73.57902124144736",
    "45.49754068421053,-73.57899589144736","45.497567884210525,-73.57897054144736",
    "45.4975502,-73.57893396249999","45.49753251578947,-73.57889738355263",
    "45.49751483157895,-73.57886080460526","45.49749714736842,-73.57882422565788",
    "45.497479463157894,-73.57878764671052","45.49746177894737,-73.57875106776315"
  ];

    let obtained = indoorService.determineRouteClassroomToClassroom(start, end, building, startFloor, transition);
    let objectKey = Object.keys(obtained); 
    let resultCheck = resultChecker(obtained[objectKey[0]], expected)

    expect(resultCheck).toBeTruthy();
  });





  it('should determine shortest path to HB840 to HB922 using escalator', async () => {

    //get handles to service
    const indoorService: IndoorPathingService = TestBed.get(IndoorPathingService);
    const buildingService: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    const buildKey = "HB";

    let start: string = "HB840";
    let end: string = "HB922";
    let building: Building = await buildingService.loadBuilding(buildKey);
    let startFloor: Floor = await building.getFloorLevel("8");
    let transition: Transitions = Transitions.Escalator;

    let expectedFloor8 = ['45.49712451578947,-73.57927763355264','45.49715171578948,-73.57925228355263',
    '45.497178915789476,-73.57922693355263','45.4971966,-73.57926351249999','45.49721428421053,-73.57930009144737',
    '45.49724148421053,-73.57927474144736','45.497268684210525,-73.57924939144736','45.49729588421053,-73.57922404144736',
    '45.49732308421053,-73.57919869144737','45.497350284210526,-73.57917334144737','45.4973326,-73.5791367625',
    '45.497314915789474,-73.57910018355264','45.49729723157895,-73.57906360460527','45.49727954736842,-73.5790270256579',
    '45.497261863157895,-73.57899044671053','45.49724417894737,-73.57895386776316','45.49722649473684,-73.57891728881579',
    '45.49720881052632,-73.57888070986843','45.497236010526315,-73.57885535986843'];
    
    let expectedFloor9 = ['45.497333947368425,-73.57897632565789','45.4973162631579,-73.57893974671053',
    '45.49729857894737,-73.57890316776316','45.497280894736846,-73.57886658881579',
    '45.49726321052632,-73.57883000986843','45.497245526315794,-73.57879343092105',
    '45.49721832631579,-73.57881878092105','45.49720064210526,-73.5787822019737',
    '45.49718295789473,-73.57874562302632','45.4971652736842,-73.57870904407895',
    '45.497138073684205,-73.57873439407895','45.49711087368421,-73.57875974407895',
    '45.49708367368421,-73.57878509407894','45.497056473684204,-73.57881044407894',
    '45.497029273684205,-73.57883579407894','45.49700207368421,-73.57886114407894',
    '45.49698438947368,-73.57882456513158'];

    let obtained = indoorService.determineRouteClassroomToClassroom(start, end, building, startFloor, transition);
    let objectKey = Object.keys(obtained); 

    let check1 = resultChecker(obtained[objectKey[0]], expectedFloor8);
    let check2 = resultChecker(obtained[objectKey[1]], expectedFloor9);

    let resultCheck = check1 && check2;

    expect(resultCheck).toBeTruthy();
  });


  
  it('should determine shortest path to HB922 to HB840 using escalator', async () => {
    //get handles to service
    const indoorService: IndoorPathingService = TestBed.get(IndoorPathingService);
    const buildingService: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    const buildKey = "HB";

    let start: string = "HB922";
    let end: string = "HB840";
    let building: Building = await buildingService.loadBuilding(buildKey);
    let startFloor: Floor = await building.getFloorLevel("9");
    let transition: Transitions = Transitions.Escalator;

    
    let expectedFloor9 = ['45.497324431578946,-73.57903825460527','45.49729723157895,-73.57906360460527','45.497314915789474,-73.57910018355264','45.497287715789476,-73.57912553355264','45.4973054,-73.5791621125','45.49732308421053,-73.57919869144737','45.49729588421053,-73.57922404144736','45.497268684210525,-73.57924939144736','45.49724148421053,-73.57927474144736','45.49721428421053,-73.57930009144737','45.4971966,-73.57926351249999','45.497178915789476,-73.57922693355263','45.49715171578948,-73.57925228355263','45.49712451578947,-73.57927763355264'];
    let expectedFloor8 = ['45.49698438947368,-73.57882456513158','45.49700207368421,-73.57886114407894','45.497029273684205,-73.57883579407894','45.497056473684204,-73.57881044407894','45.49708367368421,-73.57878509407894','45.49711087368421,-73.57875974407895','45.497138073684205,-73.57873439407895','45.4971652736842,-73.57870904407895','45.49718295789473,-73.57874562302632','45.49720064210526,-73.5787822019737','45.49721832631579,-73.57881878092105','45.497236010526315,-73.57885535986843','45.49726321052632,-73.57883000986843'];

    let obtained = indoorService.determineRouteClassroomToClassroom(start, end, building, startFloor, transition);
    let objectKey = Object.keys(obtained); 

    let check1 = resultChecker(obtained[objectKey[0]], expectedFloor9);
    let check2 = resultChecker(obtained[objectKey[1]], expectedFloor8);

    let resultCheck = check1 && check2;

    expect(resultCheck).toBeTruthy();
  });


  
  it('should determine shortest path to HB840 based on User Position', async () => {
    //get handles to service
    const indoorService: IndoorPathingService = TestBed.get(IndoorPathingService);
    const buildingService: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    const buildKey = "HB";

    let start: Location = new Location(45.497347, -73.579178, 0);
    let end: string = "HB840";
    let building: Building = await buildingService.loadBuilding(buildKey);
    let startFloor: Floor = await building.getFloorLevel("8");
    let transition: Transitions = Transitions.Escalator;
    
    let expectedFloor8 = ['45.497350284210526,-73.57917334144737','45.49732308421053,-73.57919869144737','45.49729588421053,-73.57922404144736','45.497268684210525,-73.57924939144736','45.49724148421053,-73.57927474144736','45.49721428421053,-73.57930009144737','45.4971966,-73.57926351249999','45.497178915789476,-73.57922693355263','45.49715171578948,-73.57925228355263','45.49712451578947,-73.57927763355264'];

    let obtained = indoorService.determineRouteToDestinationBasedOnUserPosition(start, building, startFloor, end, transition);
    let objectKey = Object.keys(obtained); 

    let resultCheck = resultChecker(obtained[objectKey[0]], expectedFloor8);

    expect(resultCheck).toBeTruthy();
  });


  it('should determine shortest path to Men Washroom on 8th floor', async () => {
    //get handles to service
    const indoorService: IndoorPathingService = TestBed.get(IndoorPathingService);
    const buildingService: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    const buildKey = "HB";

    let start: Location = new Location(45.497347, -73.579178, 0);
    let building: Building = await buildingService.loadBuilding(buildKey);
    let startFloor: Floor = await building.getFloorLevel("8");
    let transition: Transitions = Transitions.Escalator;

    let expected = ['45.497350284210526,-73.57917334144737','45.4973326,-73.5791367625','45.497314915789474,-73.57910018355264','45.49729723157895,-73.57906360460527','45.49727954736842,-73.5790270256579','45.497261863157895,-73.57899044671053','45.49724417894737,-73.57895386776316','45.49722649473684,-73.57891728881579','45.49720881052632,-73.57888070986843','45.49719112631579,-73.57884413092106','45.497173442105264,-73.5788075519737','45.49715575789473,-73.57877097302632','45.497138073684205,-73.57873439407895','45.49711087368421,-73.57875974407895','45.49708367368421,-73.57878509407894'];
    let obtained = indoorService.getPathToClosestWashroom(start, startFloor, "M");

    let resultCheck = expected.length == obtained.length;
    expect(resultCheck).toBeTruthy();
    
  });
  

  
  it('should determine shortest path to Womens washroom on 8th floor', async () => {
   //get handles to service
    const indoorService: IndoorPathingService = TestBed.get(IndoorPathingService);
    const buildingService: BuildingFactoryService = TestBed.get(BuildingFactoryService);
    const buildKey = "HB";

    let start: Location = new Location(45.497347, -73.579178, 0);
    let building: Building = await buildingService.loadBuilding(buildKey);
    let startFloor: Floor = await building.getFloorLevel("8");
    let transition: Transitions = Transitions.Escalator;

    let expectedSize = 2;
    let obtained = indoorService.getPathToClosestWashroom(start, startFloor, "F");

    let resultCheck = expectedSize == obtained.length;
    expect(resultCheck).toBeTruthy();
    
  });
  

  
  

});
