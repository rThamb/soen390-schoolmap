import { FloorTile } from './FloorTile';
import { Location } from './Location';
import { Room } from './Room';

// This class represents the Floors that are stored in Buildings
// Each Floor instance stores a pathfinding grid configuration, it's level and POI locations.
export class Floor
{
    private floorLevel: number;
    private floorTileGrid: FloorTile[][];
    private width: number;
    private height: number;
    private rooms: Room[];

    //Temporary variables for prototyping
    public topRightCornerGPS: Location;
    public topLeftCornerGPS: Location;
    public bottomLeftCornerGPS: Location;
    public bottomRightCornerGPS: Location;
    
    public pointsOfInterest: any;
    //-------------------------------------

    constructor()
    {

    }

    public getFloorLevel()
    {
        return this.floorLevel;
    }

    public setFloorLevel(fl: number)
    {
        this.floorLevel = fl;
    }

    public getFloorTileGrid()
    {
        return this.floorTileGrid;
    }

    public setFloorTileGrid(ftg: FloorTile[][])
    {
        this.floorTileGrid = ftg;
    }

    public getWidth()
    {
        return this.width;
    }

    public setWidth(w: number)
    {
        this.width = w;
    }

    public getHeight()
    {
        return this.height;
    }

    public setHeight(h: number)
    {
        this.height = h;
    }

    public addRoom(r: Room)
    {
        this.rooms.push(r);
    }

    public getBinaryGrid(): any{

        debugger;
        let binaryGrid: number[][] = [];

        let length = this.floorTileGrid.length;
        let width = this.floorTileGrid[0].length;
        let arr = [];
        for(let i = 0; i < length; i++){
        arr = [];
            let currentRow = this.floorTileGrid[i];
            for(let j = 0; j < width; j++){
                let num: FloorTile = currentRow[j];
                let tile = num.getPathfinderCode();
                arr.push(tile);
            }
        binaryGrid.push(arr);
        arr = [];
        }
        return binaryGrid;
    }
}