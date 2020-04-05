import { GridCoordinate } from './GridCoordinate'
import {Location} from './Location'

// IndoorPOI class represents any indoor point of interest within the floor
// that is locatable. The type attribute specifies what kind of POI.

export class IndoorPOI extends Location
{
    private key: string;
    private coord: GridCoordinate;

    private buildingLocatedIn: string;
    private floorNum: number;

    constructor(lat: number, lng: number, xCoord: number, yCoord: number, k: string,
                buildingIn: string, floorNum: number)
    {  
        super(lat, lng, 0);
        this.coord = new GridCoordinate(xCoord, yCoord);
        this.key = k;

        this.buildingLocatedIn = buildingIn;
        this.floorNum = floorNum;
    }

    public getKey()
    {
        return this.key;
    }

    public getGridCoordinate(){
        return this.coord;
    }

    public getFloorNum(){
        return this.floorNum;
    }

}
