import { Injectable } from '@angular/core';
import { Floor } from '../../models/Floor' 
import { Coordinate } from '../../models/Coordinate'

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
      "H8": "H8_Floor.json" 
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

  private jsonToFloor(json: any) : Floor{
    //json['property'] - how to access values
     let floor = new Floor();
     floor.topLeftCornerGPS = new Coordinate(json.topLeftLat, json.topLeftLong);
     floor.topRightCornerGPS = new Coordinate(json.topRightLat, json.topRightLong);
     floor.bottomLeftCorrnerGPS = new Coordinate(json.bottomLeftLat, json.bottomLeftLong);
     floor.bottomRightCornerGPS = new Coordinate(json.bottomRightLat, json.bottomRightLong);
     floor.pathfindingFloorGrid = json.binaryGrid;
     floor.pointsOfInterest = json.POI; 
     return floor;
  }
}
