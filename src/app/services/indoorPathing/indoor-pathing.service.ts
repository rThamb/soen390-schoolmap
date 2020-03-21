import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../../models/Floor';
import { Building } from '../../models/Building';
import { ReadGridService } from '../readGrid/read-grid.service';
import { Location } from '../../models/Location';
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service' 
import { GridCoordinate } from '../../models/GridCoordinate'
import { Transitions } from '../../models/Transitions'


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

  //service method 
  public determineRouteToDestinationBasedOnUserPosition(userPosition: Location, building: Building, 
    currentFloor: Floor, destination: string, option: Transitions){

    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, currentFloor);
    return this.determineRouteToDestination(userPos, building, currentFloor, destination, option); 
  }
  
  //service method
  public determineRouteClassroomToClassroom(classStart: string, classDest: string, 
    building: Building, currentFloor: Floor, option: Transitions){

      let startingFloor = this.getFloorLevelFromDestination(building.getBuildingKey(), classStart);
      let classStartCoordinate: GridCoordinate = building.getFloorLevel(startingFloor + "").getClassroomCoordinate(classStart);
      return this.determineRouteToDestination(classStartCoordinate, building, currentFloor, classDest, option); 
  }


  private determineRouteToDestination(startPostition: GridCoordinate, building: Building, 
    currentFloor: Floor, destination: string, option: Transitions): any{

      //key (str, floor#) => Location[]
      let journey = {};

      let currentGridLocation = startPostition;
      let startFloor = currentFloor.getFloorLevel();
      let currentFloorNum = startFloor; 
      let destinationLevel = this.getFloorLevelFromDestination(building.getBuildingKey(), destination);

      for(let i = currentFloorNum; i < destinationLevel + 1;){
        
        let currentFloorPath = [];
        //check if we need to transition
        if(i != destinationLevel){
          //need to transition
          currentFloorPath = this.getTransitionPathForOption(option, currentGridLocation, currentFloor);

          //currently transitioning
            /*  
              When transitioning, stair and elevators don't change the grid position (latLng) when changing
              floors. Elevator and Stairs are directly up/down on another floor, so no change in x,y position


              Escalators on the other hand change users grid position each time they go up/down. 
              So we'll need to update currentlocation each time we transition.
            */

            //set grid location once you reach the top.
            if(option = Transitions.Escalator)
             currentGridLocation = building.getFloorLevel((i + 1) + "").getUp_EscalatorCoordinate();
        }
        else{
          if(i == destinationLevel){
            currentFloorPath = this.getPathForClassroomOnSameFloor(currentGridLocation, currentFloor, destination);
          }
        }

        journey[i + ""] = this.gpsmapping.getLngLatForPath(currentFloor, currentFloorPath);
        i++;//go up a floor
        currentFloor = building.getFloorLevel(i + "");
      }

      return journey;
  }

  private getTransitionPathForOption(option: Transitions, start: GridCoordinate, currentFloor: Floor){

    let path = [];
    switch(option)
    {
      case Transitions.Stairs:
        return this.getPathForStairsOnSameFloor(start, currentFloor)[0];
      case Transitions.Escalator:
        return this.getPathForEscalatorUpOnSameFloor(start, currentFloor);
      case Transitions.Elavator:
        return this.getPathForElevatorOnSameFloor(start, currentFloor);
    }

    return path;
  }
















  private determineRouteForCurrentFloor(startPostition: GridCoordinate, building: Building, 
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

        switch(destination){
          case "Mens Washroom":
            path = this.getPathToClosestWashroom(startPostition, currentFloor, "M");
            break; 
          case "Womens Washroom":
            path = this.getPathToClosestWashroom(startPostition, currentFloor, "F");
            break; 
          case "Stairs":
            path = this.getPathForStairsOnSameFloor(startPostition, currentFloor);
            break;
          case "Elevator":
            path = this.getPathForElevatorOnSameFloor(startPostition, currentFloor);
            break;
        }
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
