import { Floor } from './Floor';
import {Location} from './Location';

// This class represents a building object found on the map.
// It contains an array of floors containing points of interests.
export class Building
{
    private buildingLocation: Location;
    private floors: Floor[];

    constructor()
    {
    
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