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

  private baseDir: string = "assets/binary_floor_layouts/"

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

    //Set dictionnary for building
    let buildingData = await this.floorService.buildingInfo(buildingKey);
    building.setBuildingInfo(buildingData);

    //set building location
    let jsonContent = await this.readFile(this.baseDir + buildingKey + ".json");
    let lng = jsonContent["buildingLatLng"]["lng"];
    let lat = jsonContent["buildingLatLng"]["lat"];
    let location = new Location(lat, lng, 0);
    building.setBuildingLocation(location);

    //set building name
    building.setBuildingName(jsonContent["buildingName"]);

    return building;
  }


<<<<<<< HEAD
=======
  private async readFile(filename: string){
     let res = await fetch(filename);
     let json = await res.json();
     return json;
  }
>>>>>>> UC-47: Suggesting outdoor and indoor. Hardcoded values need to be replace.
}
