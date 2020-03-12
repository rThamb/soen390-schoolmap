import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../../models/Floor';
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

  getPathForDestinationOnSameFloor(userPosition: Location, floor: Floor, endClass: string)
   {

    //ignore userPostion for now
    let points =  this.gpsmapping.getFloorGridCoordinate(userPosition, floor);

    let startX = points["x"];
    let startY = points["y"];

    let endX = floor.pointsOfInterest[endClass]["x"];
    let endY = floor.pointsOfInterest[endClass]["y"];

    let path = this.determineOptimalPath(startX, startY, endX, endY, floor);
    return path;
  }

  private getBinaryGrid(floor: Floor)
  {
    return floor.getBinaryGrid();
  }

  
  async getPath(floor: Floor)
  {

    floor.setWidth(10);
    floor.setHeight(10);

    let grid = new pf.Grid(floor.getBinaryGrid());
    let finder = new pf.AStarFinder();
    let path = finder.findPath(1, 0, 2, 3, grid);
    
    return path;
  }
  

  determineOptimalPath(startX, startY, endX, endY, floor){

    let grid = new pf.Grid(floor.getBinaryGrid());
    let finder = new pf.AStarFinder();
    let path = finder.findPath(startX, startY, endX, endY, grid);
    return path;
  }

}
