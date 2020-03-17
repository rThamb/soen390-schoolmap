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

    private classrooms: string[];

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
    public getFloorLevel(key: string): Floor{
        return this.floors[this.buildingKey + key];
    }


    /**
     * Returns all the classroom codes in this building.
     */
    public getAllClassroomCodes(){

        if(this.classrooms == null){
        let classroomCodes = [];
        let floorCodes = Object.keys(this.floors);

        for(let i = 0; i < floorCodes.length; i++){
            let curFloor = floorCodes[i];

            let pois = this.floors[curFloor].pointsOfInterest;
            let classRooms = Object.keys(pois);

            for(let j = 0; j < classRooms.length; j++){
                let str = classRooms[j];
                if(str.substring(0, this.buildingKey.length) === this.buildingKey)
                    classroomCodes.push(str);
            }
        }
        this.classrooms = classroomCodes;
        }

        return this.classrooms;
    }
}