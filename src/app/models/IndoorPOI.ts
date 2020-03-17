import { GridCoordinate } from './GridCoordinate'

// IndoorPOI class represents any indoor point of interest within the floor
// that is locatable. The type attribute specifies what kind of POI.

export class IndoorPOI
{
    private key: string;
    private coord: GridCoordinate;
    constructor(xCoord: number, yCoord: number, k: string)
    {
        this.coord = new GridCoordinate(xCoord, yCoord);
        this.key = k;
    }

    public getType()
    {
        return this.key;
    }

    public setType(k: string)
    {
        this.key = k;
    }

    public getGridCoordinate()
    {
        return this.coord;
    }

    public setGridCoordinate(c: GridCoordinate)
    {
        this.coord = c;
    }


}