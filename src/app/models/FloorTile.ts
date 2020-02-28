import { IndoorPOI } from './IndoorPOI';

// This class represents every walkable/unwalkable tile on a floor that is used by pathfindingjs
// pathfindercode = 0 = walkable & 1 = unwalkable.
// Also contains Indoor Point of Interest located at that point
export class FloorTile
{
    private poi: IndoorPOI;
    private pathfinderCode: number; // 0 or 1

    constructor(p: IndoorPOI, pfc: number)
    {
        this.poi = p;
        this.pathfinderCode = pfc;
    }

    
}