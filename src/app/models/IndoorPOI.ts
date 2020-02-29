// IndoorPOI class represents any indoor point of interest within the floor
// that is locatable. The type attribute specifies wether it is a room, drinking fountain, etc...

export class IndoorPOI extends Location
{
    private type: string;
    
    constructor(lat: number, lng: number, alt: number, t: string)
    {
        super();
        this.type = t;
    }

    public getType()
    {
        return this.type;
    }

    public setType(t: string)
    {
        this.type = t;
    }


}