import { Building } from './Building';

export class Campus
{
    private buildings: Building[];
    private campusLocation: Location;

    constructor(cl: Location)
    {
        this.campusLocation = cl;
        this.buildings = [];
    }

    public getCampusLocation()
    {
        return this.campusLocation;
    }

    public setCampusLocation(newLocation: Location)
    {
        this.campusLocation = newLocation;
    }

    public getCampusBuildings()
    {
        return this.buildings;
    }

    public setCampusBuildings(b: Building[])
    {
        this.buildings = b;
    }
}