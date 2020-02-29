// This class represents a coordinate location object on the map
// Every Point of interest has a location
export class Location {

    public latitude: number;
    public longitude: number;
    public altitude: number;

    constructor(lat: number, lng: number, alt: number) {
        this.latitude = lat;
        this.longitude = lng;
        this.altitude = alt;
    }
}
