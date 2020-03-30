import { GridCoordinate } from './GridCoordinate'
import {Location} from './Location'

// IndoorPOI class represents any indoor point of interest within the floor
// that is locatable. The type attribute specifies what kind of POI.

export class IndoorPOI extends Location
{
    private key: string;
    private coord: GridCoordinate;
    constructor(lat: number, lng: number, xCoord: number, yCoord: number, k: string)
    {  
        super(lat, lng, 0);
        this.coord = new GridCoordinate(xCoord, yCoord);
        this.key = k;
    }

    public getKey()
    {
        return this.key;
    }
}
