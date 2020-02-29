import { Floor } from './Floor';

// This class represents a building object found on the map.
// It contains an array of floors containing points of interests.
export class Building
{
    private buildingLocation: Location;
    private floors: Floor[];

    constructor(bl: Location)
    {
        this.buildingLocation = bl;
    }

    public getBuildingLocation()
    {
        return this.buildingLocation;
    }

    public setBuildingLocation(newbl: Location)
    {
        this.buildingLocation = newbl;
    }

    public getFloors()
    {
        return this.floors;
    }

    public setFloors(f: Floor[])
    {
        this.floors = f;
    }
}