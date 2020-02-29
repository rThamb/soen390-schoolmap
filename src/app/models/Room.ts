import { IndoorPOI } from './IndoorPOI';

export class Room extends IndoorPOI
{
    private roomNumber: string;

    constructor(rn: string, lat: number, lng: number, alt: number)
    {
        super(lat, lng, alt, 'Room');
        this.roomNumber = rn;
    }

    public getRoomNumber()
    {
        return this.roomNumber;
    }

    public setRoomNumber(rn: string)
    {
        this.roomNumber = rn;
    }
}