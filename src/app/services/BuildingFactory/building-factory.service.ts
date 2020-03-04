import { Injectable } from '@angular/core';
import { Building } from 'src/app/models/Building';
import { Room } from '../../models/Room';
import { Location } from '../../models/Location';
import { Floor } from 'src/app/models/Floor';

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

  constructor() { }

  /**
   * Fetches the building data from the JSON file parameter and loads it into a Building object
   * returns the building object. This class is injected into the MapComponent as a service.
   */

  public getBuilding(buildingJSON: string)
  {
    
    const jsonFileContent = fs.readFileSync('./assets/buildings/' + buildingJSON);
    const json = JSON.parse(jsonFileContent);

    //let json = this.fetchBuilding(buildingJSON);
    let building = new Building();

    let rNum, lat, lng;
    let bl = new Location(json.Location.lat, json.Location.lng, 0);
    
    building.setBuildingLocation(bl);

    for(var i = 0; i < json.Floors; i++)
    {
      let floor = new Floor();

      floor.setFloorLevel(json.Floors[i].level);
      floor.setWidth(json.Floors[i].width);
      floor.setHeight(json.Floors[i].height);
      
      for(var j = 0; j < json.Rooms.length(); j++)
      {
        rNum = json.Floors[i].Rooms[j].rNum;
        lat = json.Floors[i].Rooms[j].latitude;
        lng = json.Floors[i].Rooms[j].longitude;

        let room = new Room(rNum,lat,lng,0); // 0 because altitude not being used currently in system. Might remove from Location in next sprint depending on usefulness.
        floor.addRoom(room);

      }

      building.addFloor(floor);
    }
    
    return building;
  }
}
