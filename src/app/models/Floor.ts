import { FloorTile } from './FloorTile';

// This class represents the Floors that are stored in Buildings
// Each Floor instance stores a pathfinding grid configuration, POI locations and UI data.
export class Floor
{
    private level: number;
    private floorTileGrid: FloorTile[][];
    private floorTileGridWidth: number;
    private floorTileGridHeight: number;

    constructor()
    {
    
    }
}