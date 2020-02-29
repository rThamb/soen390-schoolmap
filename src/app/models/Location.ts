// This class represents a coordinate location object on the map
// Every Point of interest has a location

declare var google;

export class Location {

    public latitude: number;
    public longitude: number;
    private altitude: number;

    constructor(lat: number, lng: number, alt: number) {
        this.latitude = lat;
        this.longitude = lng;
        this.altitude = alt;
    }

    public getLng()
    {
        return this.longitude;
    }

    public setLng(lng: number)
    {
        this.longitude = lng;
    }

    public getLat()
    {
        return this.latitude;
    }

    public setLat(lat: number)
    {
        this.latitude = lat;
    }

    public getGoogleLatLng()
    {
        return new google.maps.LatLng(this.latitude, this.longitude);
    }
}
