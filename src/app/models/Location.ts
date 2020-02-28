// This class represents a coordinate location object on the map
// Every Point of interest has a location
export class Location{

    public longitude: number;
    public latitude: number;
    public altitude: number;
 
    constructor(long: number, lat: number, alt: number){
        this.longitude = long;
        this.latitude = lat;
        this.altitude = alt;
    } 
}
