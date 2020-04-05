import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../../models/Floor';
import { Building } from '../../models/Building';
import { ReadGridService } from '../readGrid/read-grid.service';
import { Location } from '../../models/Location';
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service' 
import { GridCoordinate } from '../../models/GridCoordinate'
import { Transitions } from '../../models/Transitions'
import { IndoorPOI } from '../../models/IndoorPOI'



declare var require: any;
const pf = require('pathfinding');


@Injectable({
  providedIn: 'root'
})
export class IndoorPathingService {

  private stairKey: string;
  private elevatorKey: string; 
  private escalatorKey: string;

  constructor(private service: ReadGridService, 
              private gpsmapping: GpsGridMappingService) 
  { 
  }


  public getPathToClosestWashroom(userPosition: Location, floor: Floor, gender: string): Location[]
  {
    let userPositionCoor: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, floor);
    let dest: GridCoordinate = null;

    if(gender === "M")
      dest = floor.getMensWashroom();
    
    else
      dest = floor.getWomensWashroom();

    let path = this.determineOptimalPath(userPositionCoor, dest, floor);
    let pathLatLng = this.gpsmapping.getLngLatForPath(floor, path);

    return pathLatLng;
  }



  /**
   * Determines the path at the user's position and a destination on the current floor. 
   * (Start and End for the same floor)
   * 
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
   * Generates a transition route for an indoor destination given the user's current position.
   */
  public determineRouteToDestinationBasedOnUserPosition(userPosition: Location, building: Building, 
    currentFloor: Floor, destination: string, option: Transitions){
    
    let userPos: GridCoordinate = this.gpsmapping.getFloorGridCoordinate(userPosition, currentFloor);
    let destPOI: IndoorPOI = building.getIndoorPOIInBuilding(destination);

    return this.determineRouteToDestination(userPos, building, currentFloor, destPOI, option); 
  }
  
  /**
   * Generates a transition route for an indoor destination given another indoor POI as start.
   * 
   * @param classStart 
   * @param classDest 
   * @param building 
   * @param currentFloor 
   * @param option 
   */
  public determineRouteClassroomToClassroom(classStart: string, classDest: string, 
    building: Building, currentFloor: Floor, option: Transitions){

      debugger;


      let startingFloor = this.getFloorLevelFromDestination(building.getBuildingKey(), classStart);
      let poi = building.getIndoorPOIInBuilding(classDest);
      let classStartCoordinate: GridCoordinate = building.getFloorLevel(startingFloor + "").getClassroomCoordinate(classStart);
      return this.determineRouteToDestination(classStartCoordinate, building, currentFloor, poi, option); 
  }


  private determineRouteToDestination(startPostition: GridCoordinate, building: Building, 
    currentFloor: Floor, destinationPOI: IndoorPOI, option: Transitions): any{

    let destination: string = destinationPOI.getKey();

    let startFloor = currentFloor.getFloorLevel();
    let destinationLevel = destinationPOI.getFloorNum();
    //let destinationLevel = this.getFloorLevelFromDestination(building.getBuildingKey(), destination);


    if(startFloor > destinationLevel){
      return this.determineRouteToDestinationDownwards(startPostition, building, currentFloor, destination, option);
    }  

      //key (str, floor#) => Location[]
      let journey = {};

      let currentGridLocation: GridCoordinate = startPostition;
      let currentFloorNum = startFloor; 

      for(let i = currentFloorNum; i < destinationLevel + 1;){
        
        let currentFloorPath = [];
        //check if we need to transition
        if(i != destinationLevel){
          //need to transition
          currentFloorPath = this.getTransitionPathForOption(option, currentGridLocation, currentFloor, "Up");

          //currently transitioning
            /*  
              When transitioning, stair and elevators don't change the grid position (latLng) when changing
              floors. Elevator and Stairs are directly up/down on another floor, so no change in x,y position


              Escalators on the other hand change users grid position each time they go up/down. 
              So we'll need to update currentlocation each time we transition.
            */

            //set grid location once you reach the top.
            let floor: Floor = building.getFloorLevel((i + 1) + "");
            
            if(option === Transitions.Escalator){
             currentGridLocation = floor.getUp_EscalatorCoordinate();
            }
            else if(option === Transitions.Elavator){
              currentGridLocation = floor.getElevatorCoordinate();
            }
            else if(option === Transitions.Stairs){
              let startNextFloor =  currentFloorPath[currentFloorPath.length - 1];
              let startNextCoord = new GridCoordinate(startNextFloor[0], startNextFloor[1]);
              currentGridLocation = startNextCoord;
            }
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

  private getTransitionPathForOption(option: Transitions, start: GridCoordinate, currentFloor: Floor, direction: string){

    let path = [];

    //get transitions

    switch(option)
    {
      case Transitions.Stairs:
        return this.getPathForStairsOnSameFloor(start, currentFloor);
      case Transitions.Escalator:
        if(direction == "Up")
          return this.getPathForEscalatorUpOnSameFloor(start, currentFloor);
        else
          return this.getPathForEscalatorDownOnSameFloor(start, currentFloor);
      case Transitions.Elavator:
        return this.getPathForElevatorOnSameFloor(start, currentFloor);
    }

    return path;
  }

  private determineRouteToDestinationDownwards(startPostition: GridCoordinate, building: Building, 
    currentFloor: Floor, destination: string, option: Transitions): any{
    
    let startFloor = currentFloor.getFloorLevel();
    let destinationLevel = this.getFloorLevelFromDestination(building.getBuildingKey(), destination);


      //key (str, floor#) => Location[]
      let journey = {};

      let currentGridLocation = startPostition;
      let currentFloorNum = startFloor; 

      for(let i = currentFloorNum; i > destinationLevel - 1;){
        
        let currentFloorPath = [];
        //check if we need to transition
        if(i != destinationLevel){
          //need to transition
          currentFloorPath = this.getTransitionPathForOption(option, currentGridLocation, currentFloor, "Down");

          //currently transitioning
            /*  
              When transitioning, stair and elevators don't change the grid position (latLng) when changing
              floors. Elevator and Stairs are directly up/down on another floor, so no change in x,y position


              Escalators on the other hand change users grid position each time they go up/down. 
              So we'll need to update currentlocation each time we transition.
            */

            //set grid location once you reach the top.
            let floor: Floor = building.getFloorLevel((i - 1) + "");
            if(option === Transitions.Escalator)
             currentGridLocation = floor.getDown_EscalatorCoordinate();
            else if(option === Transitions.Elavator){
              currentGridLocation = floor.getElevatorCoordinate();
            }
            else if(option === Transitions.Stairs){
              currentGridLocation = floor.getStairsCoordinate()[0];
            }

        }
        else{
          if(i == destinationLevel){
            currentFloorPath = this.getPathForClassroomOnSameFloor(currentGridLocation, currentFloor, destination);
          }
        }

        journey[i + ""] = this.gpsmapping.getLngLatForPath(currentFloor, currentFloorPath);
        i--;//go down a floor
        currentFloor = building.getFloorLevel(i + "");
      }

      return journey;
  }

  private getFloorLevelFromDestination(buildingkey: string, destKey: string){
    return Math.trunc(parseInt(destKey.replace("HB", "")) / 100);
  }
}
