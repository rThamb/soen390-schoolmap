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
import { GridCoordinate } from '../../models/GridCoordinate';
import {HistoryService} from '../../services/history/history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  constructor(private gridservice: GpsGridMappingService, private bfact: BuildingFactoryService, private historyService: HistoryService) {

  }

  ngOnInit() {

    //Initializes a users history in the storage on startup
    this.historyService.historyInit()
  }

  

}
