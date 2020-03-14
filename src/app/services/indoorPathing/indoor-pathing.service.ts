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


  private getPathToClosestWashroom(userPosition: Location, floor: Floor, gender: string){
    
    let dest: GridCoordinate = null;

    if(gender === "M")
      dest = floor.getMensWashroom();
    
    else
      dest = floor.getWomensWashroom();

    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, floor);    
    let path = this.determineOptimalPath(userPos.x, userPos.y, dest.x, dest.y, floor);
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
  private getPathForClassroomOnSameFloor(userPosition: Location, floor: Floor, endClass: string)
   {
    //ignore userPostion for now
    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, floor);
    let dest: GridCoordinate = floor.getClassroomCoordinate(endClass);
    
    let path = this.determineOptimalPath(userPos.x, userPos.y, dest.x, dest.y, floor);
    return path;
  }

  private getPathForStairsOnSameFloor(userPosition: Location, floor: Floor){
    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, floor);
    let dests: GridCoordinate[] = floor.getStairsCoordinate();
    let path = null; 
    let routeDistance = 0;
    //for each stair, determine the closest set of stairs
    for(let i =0; i < dests.length; i++){
      let dest = dests[i];
      let curPath = this.determineOptimalPath(userPos.x, userPos.y, dest.x, dest.y, floor);

      if(routeDistance == 0 || curPath.length < routeDistance){
        path = curPath;
        routeDistance = curPath.length;
      }
    }
    return path;
  }

  private getPathForElevatorOnSameFloor(userPosition: Location, floor: Floor){
    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, floor);
    let dest: GridCoordinate = floor.getElevatorCoordinate();

    let path = this.determineOptimalPath(userPos.x, userPos.y, dest.x, dest.y, floor);
    return path;
  }

  private getPathForEscalatorUpOnSameFloor(userPosition: Location, floor: Floor){
    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, floor);
    let dest: GridCoordinate = floor.getUp_EscalatorCoordinate();

    let path = this.determineOptimalPath(userPos.x, userPos.y, dest.x, dest.y, floor);
    return path;
  } 

  private getPathForEscalatorDownOnSameFloor(userPosition: Location, floor: Floor){
    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, floor);
    let dest: GridCoordinate = floor.getDown_EscalatorCoordinate();

    let path = this.determineOptimalPath(userPos.x, userPos.y, dest.x, dest.y, floor);
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
  private determineOptimalPath(startX, startY, endX, endY, floor){
    let binaryGrid = floor.getBinaryGrid();

    let a = binaryGrid[startY][startX]; 
    let b = binaryGrid[endY][endX];

    let grid = new pf.Grid(binaryGrid);
    let finder = new pf.AStarFinder();
    let path = finder.findPath(startX, startY, endX, endY, grid);
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
  determineRouteToDestination(userPosition: Location, building: Building, 
    currentFloor: Floor, destination: string){

      let path = null;
      let buildingKey = building.getBuildingKey();
      //check if user wants to go to a classroom
      if(destination.indexOf(buildingKey) != -1){
        //going to a classroom
        let destFloor = this.getFloorLevelFromDestination(buildingKey, destination);

        if(currentFloor.getFloorLevel() == destFloor){
          path = this.getPathForClassroomOnSameFloor(userPosition, currentFloor, destination);
        }
        else{
          let pathStairs = this.getPathForStairsOnSameFloor(userPosition, currentFloor); 
          let pathElevator = this.getPathForElevatorOnSameFloor(userPosition, currentFloor);
          let pathEscalator = null;
          if(currentFloor.getFloorLevel() < destFloor){
            pathEscalator = this.getPathForEscalatorUpOnSameFloor(userPosition, currentFloor);
          }
          else if(currentFloor.getFloorLevel() > destFloor){
            pathEscalator = this.getPathForEscalatorDownOnSameFloor(userPosition, currentFloor);
          }

          let paths = {
            "Stairs": pathStairs,
            "Elevator": pathElevator,
            "Escalator": pathEscalator
          };

          return paths;
        }
      }
      else{
        //user is not going to a class room
        if(destination === "Washroom")
          return this.getPathToClosestWashroom(userPosition, currentFloor, "M");          
      }
  }


  private getFloorLevelFromDestination(buildingkey: string, destKey: string){
    return Math.trunc(parseInt(destKey.replace("HB", "")) / 100);
  }






  

}
