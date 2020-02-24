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
  { 

  }

  async getPathForDestinationOnSameFloor(userPostion: Coordinate, floor: Floor, classroom: string){

    //ignore userPostion for now
    let start = "H840";
    classroom = "H890"; //destination
    floor = await this.service.createGrid("H8");

    debugger;

    let startX = floor.pointsOfInterest[start].x;
    let startY = floor.pointsOfInterest[start].y;

    let endX = floor.pointsOfInterest[classroom].x;
    let endY = floor.pointsOfInterest[classroom].y;

    let path =  this.determineOptimalPath(startX, startY, endX, endY, floor);
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
    console.log(grid);

    let finder = new pf.AStarFinder();
    // findPath(x1,y1,x2,y2) col, row
    let path = finder.findPath(1, 0, 2, 3, grid);

    console.log(path);

    return path;
  }
  

  determineOptimalPath(startX, startY, endX, endY, floor){
    debugger;
    let grid = new pf.Grid(floor.pathfindingFloorGrid);
    let finder = new pf.AStarFinder();
    // findPath(x1,y1,x2,y2) col, row
    //let path = finder.findPath(1, 0, 2, 3, grid);

    let path = finder.findPath(startX, startY, endX, endY, grid);
    console.log(path);
    return path;
  }

}
