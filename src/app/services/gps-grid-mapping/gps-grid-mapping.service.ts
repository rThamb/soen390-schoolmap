import { Injectable } from '@angular/core';
import { Location } from '../../models/Location';
import { Floor } from '../../models/Floor';
import { GridCoordinate } from '../../models/GridCoordinate';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Building } from '../../models/Building'




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
  constructor(private geolocation: Geolocation) { }

  getFloorGridCoordinate(userPosition: Location, currentFloor: Floor) : GridCoordinate{

    let x = this.mapUserLatitudeToXCoordinate(userPosition.getLat(), userPosition.getLng(), currentFloor);
    let y = this.mapUserLongitudeToYCoordinate(userPosition.getLat(), userPosition.getLng(), currentFloor);

    //check if with in the bound
    if(!(0 <= x && x < currentFloor.getWidth() && 0 <= y && y < currentFloor.getHeight()))
      return null; 

    return new GridCoordinate(x, y);

  }


  //determine the x index of the floor cell that resemble his actually position. (left to right)
  private mapUserLatitudeToXCoordinate(lat: number, long:number, floor: Floor){

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


  //topLeft, topRight
  private getLngLatForCoordinate(x, y, ref1Lng, ref1Lat, ref2Lng, ref2Lat, ref3Lng, ref3Lat, sizeX, sizeY){

    //determine shift vector
    //shift size amount lng distance

    let shiftVectorXComponent = (ref2Lng - ref1Lng) / sizeX; //x of X axis shift
    let shiftVectorYComponent = (ref2Lat - ref1Lat) / sizeX; //y of X axis shift

    //components (avg)


    let xAddition = shiftVectorXComponent * (x + 1.25); //((shiftVectorXComponent * x + shiftVectorXComponent * (x + 1)) / 2.0);
    let yAddition = shiftVectorYComponent * (x + 1.25);//((shiftVectorYComponent * x + shiftVectorYComponent * (x + 1)) / 2.0);
    
    let positionAfterXShiftLng = ref1Lng + xAddition;
    let positionAffterXShiftLat = ref1Lat + yAddition;

    //determine how much to shift down
    shiftVectorXComponent = (ref3Lng - ref1Lng) / sizeY; //x of X axis shift
    shiftVectorYComponent = (ref3Lat - ref1Lat) / sizeY; //y of X axis shift

    xAddition = shiftVectorXComponent * (y + 0.75);//((shiftVectorXComponent * y + shiftVectorXComponent * (y + 1)) / 2.0);
    yAddition = shiftVectorYComponent * (y + 0.75);// ((shiftVectorYComponent * y + shiftVectorYComponent * (y + 1)) / 2.0);

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

  /**
   * Used to determine whether or not a user is in a building.
   * @param userPosition 
   * @param floor 
   */
  public userInBuilding(userPosition: Location, building: Building): boolean{
    let keys = Object.keys(building.getFloors());
    if(keys.length < 1)
      return false;
    let floor = building.getFloors()[keys[0]];
    return this.getFloorGridCoordinate(userPosition, floor) != null;
  }

  public async getUserCurrentPosition(){
    const resp = await this.geolocation.getCurrentPosition();
    let location: Location = new Location(resp.coords.latitude, resp.coords.longitude, 0);
    return location;
  }
}
