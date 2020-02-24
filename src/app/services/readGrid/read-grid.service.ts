import { Injectable } from '@angular/core';
import { Floor } from '../../models/Floor' 

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
  
  getGrid(floorKey): Promise<any>{
    return new Promise<any>((resolve, reject) => {
        let floor = this.createGrid(floorKey);
        resolve(floor)
    }); 
  }

  private async createGrid(keyName: string): Floor
  {
    try{
      debugger;
      let floorPlan: Floor = null;
      let filename = this.directoryPath + this.floorFileNameMap[keyName]; 

      let res = await fetch(filename);
      let json = res.json();

      return this.jsonToFloor(json);
    }catch(err){
      console.log("Error thrown in Read-Grid.Service line:(31-37)");
      return null;
    }
  }


  private jsonToFloor(json: any) : Floor{
    //json['property'] - how to access values

     let floor = new Floor();
     floor.height = 12;
     floor.pathfindingFloorGrid = null;
     return floor;
  }






}
