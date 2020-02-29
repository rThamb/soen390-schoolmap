import { Injectable } from '@angular/core';
import { Building } from 'src/app/models/Building';
import { Room } from '../../models/Room';
import { Location } from '../../models/Location';
import { Floor } from 'src/app/models/Floor';

@Injectable({
  providedIn: 'root'
})
export class BuildingFactoryService {

  constructor() { }

  async getBuilding(buildingJSON: string)
  {
    let building = new Building();
    let buildingFilePath = './assets/buildings/' + buildingJSON;
    let res = await fetch(buildingFilePath);
    let json = await res.json();

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

        let room = new Room(rNum,lat,lng,0);
        floor.addRoom(room);

      }
    }
    

  }
}
