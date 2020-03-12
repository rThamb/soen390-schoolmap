import { Component, OnInit } from '@angular/core';
import { ReadGridService } from '../../services/readGrid/read-grid.service' 
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service' 
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service' 
import { Location } from '../../models/Location'


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

  floor: any;

  constructor(private service:ReadGridService, private service2: GpsGridMappingService,
  private service3: IndoorPathingService ) { 
    this.testIndoorPathing();
    //this.service2.getFloorTest();
    //this.setFloor();
  }

  ngOnInit() {}


  setFloor(){
    this.service.createGrid("HB").then((grid) => {
      debugger;
      this.floor = grid;
    });
  }


  
  testIndoorPathing(){
    this.service.createGrid("HB").then((grid) => {
      debugger;
      //let point =  this.service2.getFloorGridCoordinate(new Location(45.497082, -73.578647, 0) , grid[0]);
      let expect = "8,17"; 
      this.service3.getPathForDestinationOnSameFloor(new Location(45.497082, -73.578647, 0) , grid[0], "H840");
      debugger;
    });



    


    //let floors = await this.service.getBuildingFloors("HB");
    //let path = this.service3.getPathForDestinationOnSameFloor(null, grid, "H840", "H890"); 
    //console.log(path);
  }
}
