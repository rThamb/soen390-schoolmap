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
import {Tile} from './Tile';
declare var require: any;



export class Floor 
{
    public width: number;
    public height: number;
    public pathfindingFloorGrid: number[][];
    public schoolFloorGrid: Tile[][];

    constructor()
    {
        
    }


}