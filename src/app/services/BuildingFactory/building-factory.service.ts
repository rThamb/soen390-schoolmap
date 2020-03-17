import { Injectable } from '@angular/core';
import { Building } from '../../models/Building';
import { Location } from '../../models/Location';
import { Floor } from '../../models/Floor';
import { ReadGridService } from '../readGrid/read-grid.service' 


declare var require: any;
const fs: any = require('fs');

/**
 * This service class handles the Building Factory, which is responsible for
 * loading Building objects from JSON files into memory on demand. It is utilized
 * by the MapComponent class.
 */
@Injectable({
  providedIn: 'root'
})
export class BuildingFactoryService {

  constructor(private floorService:ReadGridService) { }

  /**
   * Fetches the building data from the JSON file parameter and loads it into a Building object
   * returns the building object. This class is injected into the MapComponent as a service.
   */

  public async loadBuilding(buildingKey: string){
    let building = new Building();
    building.setBuildingKey(buildingKey);
    let floorsDictionary = await this.floorService.createGrid(buildingKey);
    building.setFloors(floorsDictionary);
    return building;
  }
}
