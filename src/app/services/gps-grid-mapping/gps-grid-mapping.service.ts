import { Injectable } from '@angular/core';
import { Location } from '../../models/Location';
import { Floor } from '../../models/Floor';


@Injectable({
  providedIn: 'root'
})
export class GpsGridMappingService {

  /* 
    The purpose of this class is to map GPS coordinates to a Floor grid coordinate. 
  */
  constructor() { }


  /*
  getFloorTest(){

    let coor = new Coordinate(6.4, 4);
    let floor = new Floor();

    let topLeft = new Coordinate(4.4, 0);
    let topRight = new Coordinate(12.4, 0);
    let bottomLeft = new Coordinate(4.2, 6);

    let map = [];
    let arr = [0,0,0,0,0]
    map.push(arr);
    map.push(arr);
    map.push(arr);

    floor.pathfindingFloorGrid = map;
    floor.topLeftCornerGPS = topLeft; 
    floor.topRightCornerGPS = topRight;
    floor.bottomLeftCorrnerGPS = bottomLeft;
    
    this.getFloorGridCoordinate(coor, floor);
Y

  }
  */

  getFloorGridCoordinate(userPosition: Location, currentFloor: Floor): string {
    let x = this.mapUserLatitudeToXCoordinate(userPosition.getLat(), currentFloor);
    let y = this.mapUserLongitudeToYCoordinate(userPosition.getLng(), currentFloor);
    return x + "," + y;
  }


  //determine the x index of the floor cell that resemble his actually position. (left to right)
  private mapUserLatitudeToXCoordinate(lat: number, floor: Floor){
    
    let numberCells = floor.getFloorTileGrid[0].length;
    let exBound = floor.topRightCornerGPS.getLat();
    let lowBound = floor.topLeftCornerGPS.getLat();

    return this.determineCoordinate(lat, exBound, lowBound, numberCells);
  }

  private mapUserLongitudeToYCoordinate(long: number, floor: Floor){
    debugger;
    let numberCells = floor.getFloorTileGrid.length;
    let exBound = floor.bottomLeftCornerGPS.getLng();
    let lowBound = floor.topLeftCornerGPS.getLng();
    

    return this.determineCoordinate(long, exBound, lowBound, numberCells);
  }

  private determineCoordinate(targetGPS, extremeBound, lowestBound, numberOfCells){

    let gpsDeltaPerCell = (extremeBound - lowestBound) / numberOfCells;

    let currentLowestBound = lowestBound;
    let currentHighestBound = lowestBound + gpsDeltaPerCell;

    let index = 0;

    for(let i = 0; i < numberOfCells; i++){
      if(targetGPS >= currentLowestBound && targetGPS < currentHighestBound){
        index = i;
        break;
      }

      currentLowestBound = currentHighestBound; 
      currentHighestBound = currentLowestBound + gpsDeltaPerCell; 
    }

    return index;
  }





}
