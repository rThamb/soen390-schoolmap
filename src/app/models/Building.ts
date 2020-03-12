import { Floor } from './Floor';
import {Location} from './Location';

// This class represents a building object found on the map.
// It contains an array of floors containing points of interests.
export class Building
{
    private buildingLocation: Location;

    //dictionary with
    private floors: any;
    private buildingKey: string;

    constructor()
    {
    
    }

    public getBuildingKey(){
        return this.buildingKey;
    }
    public setBuildingKey(key){
        this.buildingKey = key;
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

    public setFloors(f: any)
    {
        this.floors = f;
    }

    public addFloor(f: Floor)
    {
        this.floors.push(f);
    }

    /**
     * Returns the floor plan for the level specified for the building.
     * @param key           Level number
     */
    public getFloorByCode(key: string): Floor{
        return this.floors[this.buildingKey + key];
    }
}