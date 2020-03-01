import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../../models/Floor';
import { ReadGridService } from '../readGrid/read-grid.service';
import { Location } from '../../models/Location';



declare var require: any;
const pf = require('pathfinding');


@Injectable({
  providedIn: 'root'
})
export class IndoorPathingService {

  constructor(private service: ReadGridService) 
  { }

   getPathForDestinationOnSameFloor(userPostion: Location, floor: Floor, startClass, endClass: string)
   {

    //ignore userPostion for now
    let startX = floor.pointsOfInterest[startClass]["x"];
    let startY = floor.pointsOfInterest[startClass]["y"];

    let endX = floor.pointsOfInterest[endClass]["x"];
    let endY = floor.pointsOfInterest[endClass]["y"];

    let path = this.determineOptimalPath(startX, startY, endX, endY, floor);
    return path;
  }

  private getBinaryGrid(floor: Floor)
  {
    let binaryGrid = [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 1]
    ];

    

    return binaryGrid;
  }

  
  async getPath(floor: Floor)
  {

    floor.setWidth(10);
    floor.setHeight(10);

    let grid = new pf.Grid(this.getBinaryGrid(floor));
    let finder = new pf.AStarFinder();
    let path = finder.findPath(1, 0, 2, 3, grid);
    
    return path;
  }
  

  determineOptimalPath(startX, startY, endX, endY, floor){

    let grid = new pf.Grid(this.getBinaryGrid(floor));
    let finder = new pf.AStarFinder();
    let path = finder.findPath(startX, startY, endX, endY, grid);
    return path;
  }

}
