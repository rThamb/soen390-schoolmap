import { Component, OnInit } from '@angular/core';
import { ReadGridService } from '../../services/readGrid/read-grid.service' 

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

  constructor(private service:ReadGridService ) { 
  }

  ngOnInit() {

    
  }

  setFloor(){
    this.service.getGrid("H8").then((grid) => {
      debugger;
      this.floor = grid;
    })
  }
}
