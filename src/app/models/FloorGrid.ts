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

 declare var require :any;
const FP = require('pathfinding');

export class FloorGrid 
{
    public grid: number[][];

    constructor(numXTiles: number, numYTiles:number)
    {

    }
}