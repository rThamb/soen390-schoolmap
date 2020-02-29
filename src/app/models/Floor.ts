import { FloorTile } from './FloorTile';

// This class represents the Floors that are stored in Buildings
// Each Floor instance stores a pathfinding grid configuration, it's level and POI locations.
export class Floor
{
    private floorLevel: number;
    private floorTileGrid: FloorTile[][];
    private floorTileGridWidth: number;
    private floorTileGridHeight: number;

    constructor(fl: number, topLeftCorner: Location, topRightCorner: Location, bottomLeftCorner: Location, bottomRightCorner: Location)
    {
        this.floorLevel = fl;
    }

    public getFloorLevel()
    {
        return this.floorLevel;
    }

    public setFloorLevel(fl: number)
    {
        this.floorLevel = fl;
    }
}