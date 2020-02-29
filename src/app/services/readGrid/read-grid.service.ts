import { Injectable } from '@angular/core';
import { Floor } from '../../models/Floor' ;
import { Location } from '../../models/Location';

@Injectable({
  providedIn: 'root'
})


export class ReadGridService {

  //data: Floor;
  directoryPath: string;
  floorFileNameMap: any;

  constructor()
  {
    //'./assets/floorMaps.json'
    this.directoryPath = "./assets/binary_floor_layouts/"; 

    let filenames = {
      "HB": "HB_Building.json" 
    }; 

    this.floorFileNameMap = filenames;
  }

  async createGrid(keyName: string)
  {
    try{
      let floorPlan: Floor = null;
      let filename = this.directoryPath + this.floorFileNameMap[keyName]; 

      let res = await fetch(filename);
      let json = await res.json();

      return this.jsonToFloor(json);

    }catch(err){
      console.log("Error thrown in Read-Grid.Service line:(31-37)");
      return null;
    }
  }

  private jsonToFloor(json: any) : any{
    let floors = [];
    let floorsData = json.floors;

    //json['property'] - how to access values

    let curFloor = null;
    for(let i = 0; i < floorsData.length; i++){

     curFloor = floorsData[i]; 
     let floor: Floor = new Floor();
     floor.topLeftCornerGPS = new Location(curFloor.topLeftLat, curFloor.topLeftLong, 0);
     floor.topRightCornerGPS = new Location(curFloor.topRightLat, curFloor.topRightLong, 0);
     floor.bottomLeftCornerGPS = new Location(curFloor.bottomLeftLat, curFloor.bottomLeftLong, 0);
     floor.bottomRightCornerGPS = new Location(curFloor.bottomRightLat, curFloor.bottomRightLong, 0);
     var binaryGrid = curFloor.binaryGrid;
     floor.pointsOfInterest = curFloor.POI; 
     floors.push(floor);
    }
    return floors;
  }
}
