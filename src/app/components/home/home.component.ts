import { Component, OnInit, ViewChild } from '@angular/core';
import { ReadGridService } from '../../services/readGrid/read-grid.service' 
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service' 
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service' 
import { Location } from '../../models/Location'
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service'
import { Building } from '../../models/Building'
import { Floor } from '../../models/Floor'
import { MapComponent } from '../map/map.component'
import { Transitions } from '../../models/Transitions'
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /*
    This is simply an example of how to use the service classes together with components 
    to obtain data and attach it to your view.

    Please look more into javascript: promises and asnyc&await 

    The example consists of calling the GridService to obtain a floor object and setting it to the component.

    THIS EXAMPLE/CODE WILL OBVIOUSLY BE REMOVED IN THE LATER FUTURE. Please use this as a simply reference to help.
  */

  @ViewChild('map', {static: false}) mapHandle: MapComponent;

  constructor(private service:ReadGridService, private service2: GpsGridMappingService,
  private service3: IndoorPathingService, private bService: BuildingFactoryService,private storage: Storage) { 
    //this.getPreferedTransition();
    //this.service2.getFloorTest();
    //this.setFloor();
  }

  ngOnInit() {}


  setFloor(){
    this.service.createGrid("HB").then((grid) => {
    
  });
  }
  
   testIndoorPathing(){
    this.service.createGrid("HB").then((grid) => {
      
      //let point =  this.service2.getFloorGridCoordinate(new Location(45.497082, -73.578647, 0) , grid[0]);
      let expect = "8,17"; 
      //this.service3.getPathForDestinationOnSameFloor(new Location(45.497082, -73.578647, 0) , grid[0], "H840");
      
    });
    //let floors = await this.service.getBuildingFloors("HB");
    //let path = this.service3.getPathForDestinationOnSameFloor(null, grid, "H840", "H890"); 
    //console.log(path);
  }

  async testBuilding(){

    
    this.bService.loadBuilding("HB").then((building: Building) => {
      
      /*let classes = building.getAllClassroomCodes();
      let floor : Floor = building.getFloorLevel("8");
      let a = floor.getClassroomCoordinate("HB840");
      let b =floor.getUp_EscalatorCoordinate();
      let c = floor.getDown_EscalatorCoordinate();
      let d = floor.getMensWashroom();
      let e = floor.getWomensWashroom();
      */
      debugger;
      let ninethfloor  = building.getFloorLevel("9");
      let width = ninethfloor.getWidth();
      let height = ninethfloor.getHeight();

      //this.service3.getPathForDestinationOnSameFloor(new Location(45.497261, -73.579023, 0) ,ninethfloor, "HB967");
      debugger;
      //let userPosition = new Location(45.497291, -73.579071, 0);
      //let isIn = this.service2.userInBuilding(userPosition, building);

      debugger;

      let curFloor = building.getFloorLevel("8"); 
      //let pathGoingUp = this.service3.determineRouteToDestinationBasedOnUserPosition(userPosition, building, curFloor, "HB890");
      
      let a = "HB922";
      let b = "HB840";

      debugger;

      let classToClass = this.service3.determineRouteToDestinationBasedOnUserPosition(building.getBuildingLocation(), building, curFloor, b, Transitions.Escalator);

      let pathDraw: Location[] = classToClass["route"];

      this.mapHandle.drawPath(pathDraw);
      //debugger;
      //let a = this.service2.getLngLatForPath(building.getFloorLevel("8"), null);
    });
  }

  private async getPreferedTransition(){

    debugger;
    let useStairs = await this.storage.get('useStairs');
    let useEle = await this.storage.get('useElevator');
    let useEcs = await this.storage.get('useEscalator'); 

    return null; 
  }
}
