import { Location } from './Location';

export class Tile
{
    public pathfinderX: number; // x index reference for pathfindingFloorGrid
    public pathfinderY: number; // y index reference for pathfindingFloorGrid
    public location: Location; // Can either be Classroom, POI, Walkable or Unwalkable
    public type: string;

    constructor(x: number, y: number, l: Location, t: string)
    {
        this.pathfinderX = x;
        this.pathfinderY = y;
        this.location = l;
        this.type = t;
    }




}