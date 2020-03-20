import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../../models/Floor';
import { Building } from '../../models/Building';
import { ReadGridService } from '../readGrid/read-grid.service';
import { Location } from '../../models/Location';
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service' 
import { GridCoordinate } from '../../models/GridCoordinate'


declare var require: any;
const pf = require('pathfinding');


@Injectable({
  providedIn: 'root'
})
export class IndoorPathingService {

  constructor(private service: ReadGridService, private gpsmapping: GpsGridMappingService) 
  { }


  private getPathToClosestWashroom(userPosition: GridCoordinate, floor: Floor, gender: string){
    
    let dest: GridCoordinate = null;

    if(gender === "M")
      dest = floor.getMensWashroom();
    
    else
      dest = floor.getWomensWashroom();

    let path = this.determineOptimalPath(userPosition, dest, floor);
    return path;
  }



  /**
   * Determines the path at the user's position and a destination on the current floor. 
   * (Start and End for the same floor)
   * 
   * @param userPosition 
   * @param floor 
   * @param endClass 
   */
  private getPathForClassroomOnSameFloor(userPosition: GridCoordinate, floor: Floor, endClass: string)
   {
    //ignore userPostion for now
    let dest: GridCoordinate = floor.getClassroomCoordinate(endClass);
    let path = this.determineOptimalPath(userPosition, dest, floor);
    return path;
  }

  private getPathForStairsOnSameFloor(userPosition: GridCoordinate, floor: Floor){
   
    let dests: GridCoordinate[] = floor.getStairsCoordinate();
    let path = null; 
    let routeDistance = 0;
    //for each stair, determine the closest set of stairs
    for(let i =0; i < dests.length; i++){
      let dest = dests[i];
      let curPath = this.determineOptimalPath(userPosition, dest, floor);

      if(routeDistance == 0 || curPath.length < routeDistance){
        path = curPath;
        routeDistance = curPath.length;
      }
    }
    return path;
  }

  private getPathForElevatorOnSameFloor(userPosition: GridCoordinate, floor: Floor){
    
    let dest: GridCoordinate = floor.getElevatorCoordinate();
    let path = this.determineOptimalPath(userPosition, dest, floor);
    return path;
  }

  private getPathForEscalatorUpOnSameFloor(userPosition: GridCoordinate, floor: Floor){
    let dest: GridCoordinate = floor.getUp_EscalatorCoordinate();
    let path = this.determineOptimalPath(userPosition, dest, floor);
    return path;
  } 

  private getPathForEscalatorDownOnSameFloor(userPosition: GridCoordinate, floor: Floor){
    let dest: GridCoordinate = floor.getDown_EscalatorCoordinate();
    let path = this.determineOptimalPath(userPosition, dest, floor);
    return path;
  } 
  
  /**
   * Method uses A* closure to find closest path given 2 points.
   * @param startX 
   * @param startY 
   * @param endX 
   * @param endY 
   * @param floor 
   */
  private determineOptimalPath(start: GridCoordinate, end: GridCoordinate, floor: Floor){
    let binaryGrid = floor.getBinaryGrid();

    let grid = new pf.Grid(binaryGrid);
    let finder = new pf.AStarFinder();
    let path = finder.findPath(start.x, start.y, end.x, end.y, grid);
    return path;
  }


  
  /**
   * Invoke this each time you need to transition to another floor.(Floor to Floor)
   * This method will be called recursively.
   * @param userPosition 
   * @param building 
   * @param currentFloor 
   * @param destination 
   * 
   * @return  will return different types of path, 
   *          current to dest,
   *          current to stairs, 
   *          current to elevator
   *          current to ecalator
   */

  determineRouteToDestinationBasedOnUserPosition(userPosition: Location, building: Building, 
    currentFloor: Floor, destination: string){

    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, currentFloor);
    return this.determineRouteToDestination(userPos, building, currentFloor, destination); 

  }
  determineRouteClassroomToClassroom(classStart: string, classDest: string, 
    building: Building, currentFloor: Floor){

      let startingFloor = this.getFloorLevelFromDestination(building.getBuildingKey(), classStart);
      let classStartCoordinate: GridCoordinate = building.getFloorLevel(startingFloor + "").getClassroomCoordinate(classStart);
      return this.determineRouteToDestination(classStartCoordinate, building, currentFloor, classDest); 
  }

  private determineRouteToDestination(startPostition: GridCoordinate, building: Building, 
    currentFloor: Floor, destination: string){

      let path = null;
      let buildingKey = building.getBuildingKey();

      //check if user wants to go to a classroom
      if(destination.indexOf(buildingKey) != -1){
        //going to a classroom
        let destFloor = this.getFloorLevelFromDestination(buildingKey, destination);

        if(currentFloor.getFloorLevel() == destFloor){
          path = this.getPathForClassroomOnSameFloor(startPostition, currentFloor, destination);
        }
        else{
          let pathStairs = this.getPathForStairsOnSameFloor(startPostition, currentFloor); 
          let pathElevator = this.getPathForElevatorOnSameFloor(startPostition, currentFloor);
          let pathEscalator = null;
          if(currentFloor.getFloorLevel() < destFloor){
            pathEscalator = this.getPathForEscalatorUpOnSameFloor(startPostition, currentFloor);
          }
          else if(currentFloor.getFloorLevel() > destFloor){
            pathEscalator = this.getPathForEscalatorDownOnSameFloor(startPostition, currentFloor);
          }

          path = {
            "Stairs": this.gpsmapping.getLngLatForPath(currentFloor, pathStairs),
            "Elevator": this.gpsmapping.getLngLatForPath(currentFloor, pathElevator),
            "Escalator": this.gpsmapping.getLngLatForPath(currentFloor, pathEscalator)
          };

          let returnObject = {
            "destOnFloor": false,
            "route": path
          };
          return returnObject;
        }
      }
      else{
        //user is not going to a class room
        if(destination === "Washroom")
           path = this.getPathToClosestWashroom(startPostition, currentFloor, "M");          
      }

      let lngLatPath = this.gpsmapping.getLngLatForPath(currentFloor, path);

    
      let returnObject = {
        "destOnFloor": true,
        "route": lngLatPath
      };

      return returnObject;
  }


  private getFloorLevelFromDestination(buildingkey: string, destKey: string){
    return Math.trunc(parseInt(destKey.replace("HB", "")) / 100);
  }


}
