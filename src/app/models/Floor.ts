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

/* 
    An instance of this class represents a floor that exists in a specific building.
 */
export class Floor 
{

    //This 4 points indicate the extreme/boundary of the actually floor.
    public topLeftCornerGPS: Coordinate;
    public topRightCornerGPS: Coordinate;
    public bottomLeftCorrnerGPS: Coordinate;
    public bottomRightCornerGPS: Coordinate;

    public width: number;
    public height: number;
    public pathfindingFloorGrid: number[][];
    public schoolFloorGrid: Tile[][];
    public floorGrid: Tile[][];

<<<<<<< HEAD
    constructor(floorFile: string, private myService: ReadGridService)
=======
    public pointsOfInterest: any;

    //constructor(private myService: ReadGridService)
    constructor()
>>>>>>> Started indoor path with json files. Running into issues, needs more work. Removed unwanted promises from service classes.
    {
        //this.myService.createGrid("testFloor");
    }


}