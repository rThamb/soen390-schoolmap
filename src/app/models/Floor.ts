/**
 * This class represents a floor grid that our
 * pathfinding algorithm will use to determine
 * the shortest path.
 * 
 * Floor grid is represented by a 2D matrix of numbers where:
 * 
 * 0 = walkable position
 * 1 = unwalkable position (walls for example)
 * 
 * see documentation of pathfindingjs for more info
 */
import { ReadGridService } from '../services/readGrid/read-grid.service';
import {Tile} from './Tile';
import { Coordinate } from './Coordinate'
declare var require: any;
<<<<<<< HEAD
const FP = require('pathfinding');
=======
>>>>>>> Setup the readGrid service to work as expected. (using promises with async await.)

export class Floor 
{
    public width: number;
    public height: number;
    public pathfindingFloorGrid: number[][];
    public schoolFloorGrid: Tile[][];
    public floorGrid: Tile[][];

    constructor(floorFile: string, private myService: ReadGridService)
    {
        //this.myService.createGrid("testFloor");
    }


}