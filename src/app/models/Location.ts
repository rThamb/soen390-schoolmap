export class Location{

    // longitude and latitude
    public longitude: number;
    public latitude: number;
    public altitude: number;

    constructor(long: number, lat: number, alt:number){
        this.longitude = long;
        this.latitude = lat;
        this.altitude = alt;
    }
}

