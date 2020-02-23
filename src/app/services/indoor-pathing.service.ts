import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../models/Floor';

declare var require: any;
const pf = require('pathfinding');


@Injectable({
  providedIn: 'root'
})
export class IndoorPathingService {

  constructor() 
  { 

  }

  getPath(floor: Floor)
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

}
