import { IndoorPOI } from './IndoorPOI';
import {GridCoordinate} from './GridCoordinate'

// This class represents every walkable/unwalkable tile on a floor that is used by pathfindingjs
// pathfindercode = 0 = walkable & 1 = unwalkable.
// Also contains Indoor Point of Interest located at that point
export class FloorTile
{
    private location: Location; // Lat/Lng
    private pathfinderCode: number; // 0 or 1
    public tileCoord: GridCoordinate;
    
    constructor(l: Location, pfc: number)
    {
        this.location = l;
        this.pathfinderCode = pfc;
    }

    public getLocation()
    {
        return this.location;
    }

    public setLocation(l: Location)
    {
        this.location = l;
    }

    public getPathfinderCode()
    {
        return this.pathfinderCode;
    }

    public setPathfinderCode(c: number)
    {
        this.pathfinderCode = c;
    }

    


}

