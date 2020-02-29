import { Component, OnInit } from '@angular/core';
import { DataService} from '../../services/data.service';
import { ReadGridService } from '../../services/readGrid/read-grid.service' 
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service' 
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service' 


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

  constructor(private dataService: DataService, private service:ReadGridService, private service2: GpsGridMappingService,
  private service3: IndoorPathingService ) { 
    //debugger;
    //this.testIndoorPathing();
    //this.service2.getFloorTest();
    //this.setFloor();
  }

  ngOnInit() {
    this.dataService.getLocalData().subscribe(data => {
      console.log('Local Data:');
      console.log(data);
    });

  }

  setFloor(){
    this.service.createGrid("H8").then((grid) => {
      debugger;
      this.floor = grid;
    })
  }

  async testIndoorPathing(){

    //debugger;
    //let grid = await this.service.createGrid("H8");
    //debugger;
    //let path = this.service3.getPathForDestinationOnSameFloor(null, grid, "H840", "H890"); 
    //console.log(path);
  }
}
