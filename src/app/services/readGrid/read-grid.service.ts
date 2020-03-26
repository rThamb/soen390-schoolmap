import { Injectable } from '@angular/core';
import { Floor } from '../../models/Floor' ;
import { Location } from '../../models/Location';
import { FloorTile } from '../../models/FloorTile'
import { Building } from '../../models/Building';
import { IndoorPOI } from '../../models/IndoorPOI'

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
      "HB": "HB.json" 
    }; 

    this.floorFileNameMap = filenames;
  }

  /**
   * Async method that will load all floors plans for a given building. 
   * @param keyName   Dictionary, where key is the floor key and value is the floor object.
   */
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

    let floors = {};
    let floorsData = json.floors;
    let floorKeys = json.floorsKeys;

    //json['property'] - how to access values

    let curFloor = null; 
    for(let i = 0; i < floorsData.length; i++){
     curFloor = floorsData[i]; 
     let floor: Floor = new Floor();
     floor.topLeftCornerGPS = new Location(curFloor.topLeftLat, curFloor.topLeftLong, 0);
     floor.topRightCornerGPS = new Location(curFloor.topRightLat, curFloor.topRightLong, 0);
     floor.bottomLeftCornerGPS = new Location(curFloor.bottomLeftLat, curFloor.bottomLeftLong, 0);
     floor.bottomRightCornerGPS = new Location(curFloor.bottomRightLat, curFloor.bottomRightLong, 0);
     floor.setFloorTileGrid(this.createTileGrid(curFloor.binaryGrid));
     floor.setFloorLevel(curFloor.level)
     floor.pointsOfInterest = curFloor.POI;
     floor.setPois(this.getPointsOfInterest(curFloor.POI));
     floors[floorKeys[i]] = floor;

     //set dimensions
     let grid = curFloor.binaryGrid;
     floor.setWidth(grid[0].length);
     floor.setHeight(grid.length);
    }
    
    return floors;
  }

  private createTileGrid(grid: number[][]): any{
    let tileGrid: FloorTile[][] = [];

    let length = grid.length;
    let width = grid[0].length;
    let arr = [];
    for(let i = 0; i < length; i++){
      arr = [];
      let currentRow = grid[i];
      for(let j = 0; j < width; j++){
        let num = currentRow[j];
        let tile = new FloorTile(null, num);
        arr.push(tile);
      }
      tileGrid.push(arr);
      arr = [];
    }
    return tileGrid;
  }
  
    
  private getPointsOfInterest(poi: any): IndoorPOI[]
  {
      let keys = Object.keys(poi);
      let pois: IndoorPOI[] = [];

      for(let i =0; i<keys.length; i++){

        let key = keys[i];

        if(key != "Stairs"){
          let curPoint = poi[key];
          let obj = new IndoorPOI(curPoint["lat"], curPoint["lng"], curPoint["x"], curPoint["y"], key);
          pois.push(obj);
        }
        else{//handle stair POIS differently
          let stairsPois = poi[key]; //an array
          for(let i =0; i < stairsPois.length; i++){
            let curPoint = stairsPois[i];
            let obj = new IndoorPOI(curPoint["lat"], curPoint["lng"], curPoint["x"], curPoint["y"], key);
            pois.push(obj);
          }    
        }    
      }
      return pois;
  }
 //Loads a Building json file, and returns a dictionary with informations about it
 async buildingInfo(keyName: string)
 {
   let buildingInformation = {}; //Dictionary

  try{
    let filename = "./assets/buildings/" + this.floorFileNameMap[keyName]; //Using /buildings directory for now. 

    let res = await fetch(filename);
    let json = await res.json();
    let buildingData = json;

    //Add to buildingInformation Dictionnary
    buildingInformation["totalFloors"] = buildingData.totalFloors;
    buildingInformation["bound"] = buildingData.bound;
    buildingInformation["Location"] = buildingData.Location;
    buildingInformation["Floors"] = buildingData.Floors;
  }
  catch(err)
  {
    console.log("Error thrown in Read-Grid.Service line:(108-120)");
    return null;
  }

  return buildingInformation;
}
  


    
}
