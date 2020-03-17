import { Injectable } from '@angular/core';
import { Location } from '../../models/Location';
import { Floor } from '../../models/Floor';
import { GridCoordinate } from '../../models/GridCoordinate';



@Injectable({
  providedIn: 'root'
})

/**
 * This class is used to map a GPS coordinate (long, lat) to a floor grid coordinate. 
 */
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

  getFloorGridCoordinate(userPosition: Location, currentFloor: Floor) : GridCoordinate{
    //let x = this.mapUserLatitudeToXCoordinate(userPosition.getLat(), currentFloor);
    //let y = this.mapUserLongitudeToYCoordinate(userPosition.getLng(), currentFloor);
    let x = this.mapUserLatitudeToXCoordinate(userPosition.getLat(), userPosition.getLng(), currentFloor);
    let y = this.mapUserLongitudeToYCoordinate(userPosition.getLat(), userPosition.getLng(), currentFloor);
    
    return new GridCoordinate(x, y);
  }


  //determine the x index of the floor cell that resemble his actually position. (left to right)
  private mapUserLatitudeToXCoordinate(lat: number, long:number, floor: Floor){
    /*
    let numberCells = floor.pathfindingFloorGrid[0].length;
    let highX = floor.topRightCornerGPS.latitude;
    let highY = floor.topRightCornerGPS.longitude;
    let lowX = floor.topLeftCornerGPS.latitude;
    let lowY = floor.topLeftCornerGPS.longitude;
    let gpsDeltaPerCell = this.getDeltaSize(lowX, lowY, highX, highY, numberCells);

    return this.determineGridCoordinate(lat, lowX, highX, gpsDeltaPerCell, numberCells);
    */

    let numberCells = floor.getFloorTileGrid()[0].length;//pathfindingFloorGrid[0].length;
    let highX = floor.topRightCornerGPS.longitude;
    let highY = floor.topRightCornerGPS.latitude;
    let lowX = floor.topLeftCornerGPS.longitude;
    let lowY = floor.topLeftCornerGPS.latitude;
    let gpsDeltaPerCell = this.getDeltaSize(lowX, lowY, highX, highY, numberCells);

    let distance = this.distanceBetweenLineAndPoint(long, lat, lowX, lowY, 
      floor.bottomLeftCornerGPS.longitude, floor.bottomLeftCornerGPS.latitude);

    let i = 0;
    let value = distance - gpsDeltaPerCell;
    while(!(value <= 0)){
      i++;
      value = value - gpsDeltaPerCell;
    }

    return i;
  }

  private mapUserLongitudeToYCoordinate(lat, long: number, floor: Floor){
    
    let numberCells = floor.getFloorTileGrid().length;
    let highX = floor.topLeftCornerGPS.longitude;
    let highY = floor.topLeftCornerGPS.latitude;
    let lowX = floor.bottomLeftCornerGPS.longitude;
    let lowY = floor.bottomLeftCornerGPS.latitude;
    let gpsDeltaPerCell = this.getDeltaSize(lowX, lowY, highX, highY, numberCells);

    let distance = this.distanceBetweenLineAndPoint(long, lat, highX, highY, 
      floor.topRightCornerGPS.longitude, floor.topRightCornerGPS.latitude);

    let i = 0;
    let value = distance - gpsDeltaPerCell;
    while(!(value <= 0)){
      i++;
      value = value - gpsDeltaPerCell;
    }

    return i;
  }

  /*
  private determineGridCoordinate(targetGPS, low, high, delta, numberOfCells){
    
    if(high < low){
        let temp = high;
        high = low;
        low = temp;
    }

    let currentLowestBound = low;
    let currentHighestBound = currentLowestBound + delta;

    let index = 0;

    for(let i = 0; i < numberOfCells; i++){
      if(targetGPS >= currentLowestBound && targetGPS < currentHighestBound){
        index = i;
        break;
      }

      currentLowestBound = currentHighestBound; 
      currentHighestBound = currentLowestBound + delta; 
    }

    return index;
  }
*/
   private getDeltaSize(lowX, lowY, highX, highY, numCols){
    let inner = Math.pow(highX - lowX, 2) + Math.pow(highY - lowY, 2);
    let result = (Math.pow(inner, 0.5)) / numCols;
    return result;
  }


  //used to find y coordinate
  private distanceBetweenLineAndPoint(userX, userY, refLowX, refLowY, refHighX, refHighY){

    //find rule
    let slope = (refHighY - refLowY) / (refHighX - refLowX);
    let b = refLowY - (slope * refLowX);

    //pen. line
    let slope2 = (-1 * (1/slope));
    let b2 = userY - (slope2 * userX);

    //find intersection point
    let xInter = (b2 - b) / (slope - slope2);
    let yInter = (slope * xInter) + b; 
    
    let distance = Math.pow((Math.pow(xInter - userX, 2) + Math.pow(yInter - userY, 2)), 0.5);

    return distance;
  }





  //method used for hall
  public setLngLatForFloorTiles(floor: Floor){

    let floorTiles = floor.getFloorTileGrid();

  }





  //topLeft, topRight
  private getLngLatForCoordinate(x, y, ref1Lng, ref1Lat, ref2Lng, ref2Lat, ref3Lng, ref3Lat, sizeX, sizeY){

    //determine shift vector
    //shift size amount lng distance

    let shiftVectorXComponent = (ref2Lng - ref1Lng) / sizeX; //x of X axis shift
    let shiftVectorYComponent = (ref2Lat - ref1Lat) / sizeX; //y of X axis shift

    //components (avg)


    let xAddition = shiftVectorXComponent * (x + 2); //((shiftVectorXComponent * x + shiftVectorXComponent * (x + 1)) / 2.0);
    let yAddition = shiftVectorYComponent * (x + 2);//((shiftVectorYComponent * x + shiftVectorYComponent * (x + 1)) / 2.0);
    
    let positionAfterXShiftLng = ref1Lng + xAddition;
    let positionAffterXShiftLat = ref1Lat + yAddition;

    //determine how much to shift down
    shiftVectorXComponent = (ref3Lng - ref1Lng) / sizeY; //x of X axis shift
    shiftVectorYComponent = (ref3Lat - ref1Lat) / sizeY; //y of X axis shift

    xAddition = shiftVectorXComponent * (y + 1);//((shiftVectorXComponent * y + shiftVectorXComponent * (y + 1)) / 2.0);
    yAddition = shiftVectorYComponent * (y + 1);// ((shiftVectorYComponent * y + shiftVectorYComponent * (y + 1)) / 2.0);

    let LngForCoordinate = positionAfterXShiftLng + xAddition;
    let LatForCoordinate = positionAffterXShiftLat + yAddition;

    return new Location(LatForCoordinate, LngForCoordinate, 0);
  }

  public getLngLatForPath(floor: Floor, path: any): Location[]{

    let markers : Location[] = [];
    
    for(let i = 0; i < path.length; i++){
      let element = path[i];
      let x = element[0];
      let y = element[1];

      let loc = this.getLngLatForCoordinate(x, y, floor.topLeftCornerGPS.getLng(), floor.topLeftCornerGPS.getLat(), 
                                                    floor.topRightCornerGPS.getLng(), floor.topRightCornerGPS.getLat(), 
                                                    floor.bottomLeftCornerGPS.getLng(), floor.bottomLeftCornerGPS.getLat(), 
                                                    floor.getFloorTileGrid()[0].length, floor.getFloorTileGrid().length);
      markers.push(loc);
    }

    return markers;
    
  
  }

}
