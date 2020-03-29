import { Building } from './Building';
import { Location } from './Location';

// Represents each campus of Concordia. Holds a location and list of building objects that are loaded from the BuildingFactory service.
export class Campus {
    private buildings: Building[];
    public campusLocation: Location;

    constructor(cl: Location) {
        this.campusLocation = cl;
        this.buildings = [];
    }

    public getCampusLocation() {
        return this.campusLocation;
    }

    public setCampusLocation(newLocation: Location) {
        this.campusLocation = newLocation;
    }
}
