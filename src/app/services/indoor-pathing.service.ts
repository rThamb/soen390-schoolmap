import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../models/Floor';
import { ReadGridService } from './readGrid/read-grid.service' 
import { Coordinate } from '../models/Coordinate'



declare var require: any;
const pf = require('pathfinding');


@Injectable({
  providedIn: 'root'
})
export class IndoorPathingService {

  constructor(private service:ReadGridService) 
  { }

   getPathForDestinationOnSameFloor(userPostion: Coordinate, floor: Floor, startClass, endClass: string){

    //ignore userPostion for now

    debugger;
    let startX = floor.pointsOfInterest[startClass]["x"];
    let startY = floor.pointsOfInterest[startClass]["y"];

    let endX = floor.pointsOfInterest[endClass]["x"];
    let endY = floor.pointsOfInterest[endClass]["y"];

    let path = this.determineOptimalPath(startX, startY, endX, endY, floor);
    return path;
  }

  
  async getPath(floor: Floor)
  {

    floor.width = 10;
    floor.height = 10;
    floor.pathfindingFloorGrid = [
      [1, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 1]
    ];

    let grid = new pf.Grid(floor.pathfindingFloorGrid);

    let finder = new pf.AStarFinder();
    // findPath(x1,y1,x2,y2) col, row
    let path = finder.findPath(1, 0, 2, 3, grid);

    return path;
  }
  

  determineOptimalPath(startX, startY, endX, endY, floor){

    let grid = new pf.Grid(floor.pathfindingFloorGrid);
    let finder = new pf.AStarFinder();

    let path = finder.findPath(startX, startY, endX, endY, grid);
    console.log(path);
    return path;
  }

}
