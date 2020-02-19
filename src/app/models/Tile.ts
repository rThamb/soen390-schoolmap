import { Location } from './Location';

export class Tile
{
    public xIndex: number; // row index reference in numeral array
    public yIndex: number; // column index reference in numeral array
    public location: Location;
    public type: string;

    constructor(x: number, y: number, l: Location, t: string)
    {
        this.xIndex = x;
        this.yIndex = y;
        this.location = l;
        this.type = t;
    }
}