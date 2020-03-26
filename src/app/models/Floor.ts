import { FloorTile } from './FloorTile';
import { Location } from './Location';
import { GridCoordinate } from './GridCoordinate'
import { IndoorPOI } from './IndoorPOI'

// This class represents the Floors that are stored in Buildings
// Each Floor instance stores a pathfinding grid configuration, it's level and POI locations.
export class Floor
{
    private floorLevel: number;
    private floorTileGrid: FloorTile[][];
    private width: number;
    private height: number;

    public topRightCornerGPS: Location;
    public topLeftCornerGPS: Location;
    public bottomLeftCornerGPS: Location;
    public bottomRightCornerGPS: Location;
    public pointsOfInterest: any; // Dictionary of POIs

    private pois: IndoorPOI[];

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

    public getPois()
    {
        return this.pois;
    }

    public setPois(p: IndoorPOI[])
    {
        this.pois = p;
    }

    public getBinaryGrid(): any{

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

    public getMensWashroom(): GridCoordinate{
        let key = "Washroom-Men";
        let washroomCoor = this.pointsOfInterest[key];
        return new GridCoordinate(washroomCoor["x"], washroomCoor["y"]); 
    }
    public getWomensWashroom(): GridCoordinate{
        let key = "Washroom-Women";
        let washroomCoor = this.pointsOfInterest[key];
        return new GridCoordinate(washroomCoor["x"], washroomCoor["y"]); 
    }

    public getStairsCoordinate(): GridCoordinate[]{
        let key = "Stairs";
        
        //list is returned
        let stairs = this.pointsOfInterest[key];

        let coordinates = []; 
        for(let i = 0; i < stairs.length; i++){
            let coor = new GridCoordinate(stairs[i]["x"], stairs[i]["y"]);
            coordinates.push(coor);
        }
        return coordinates; 
    }

    public getUp_EscalatorCoordinate(): GridCoordinate{
        let key = "Escalator-Up";
        return this.getCoordinate(key); 
    }

    public getDown_EscalatorCoordinate(): GridCoordinate{
        let key = "Escalator-Down";
        return this.getCoordinate(key); 
    }

    public getElevatorCoordinate(): GridCoordinate{
        let key = "Elevator";
        return this.getCoordinate(key); 
    }

    public getClassroomCoordinate(classCode: string): GridCoordinate{
        return this.getCoordinate(classCode); 
    }

    private getCoordinate(key: string): GridCoordinate{
        let coor = new GridCoordinate(this.pointsOfInterest[key]["x"], this.pointsOfInterest[key]["y"]);
        return coor;
    }
}