import { UserSettings } from './UserSettings'
import { UserSchedule } from './UserSchedule'
import {Location} from './Location'

/**
 * Class responsible for holding information regarding the User that needs to be accessed during runtime 
 */
export class User
{
    private location: Location
    private settings: UserSettings;
    private schedule: UserSchedule;

    constructor()
    {
        this.settings = new UserSettings();
        this.schedule = new UserSchedule();
    }

    public getSettings()
    {
        return this.settings;
    }

    public setSettings(s: UserSettings)
    {
        this.settings = s;
    }

    public getSchedule()
    {
        return this.schedule;
    }

    public setSchedule(s: UserSchedule)
    {
        this.schedule = s;
    }

    public getLocation()
    {
        return this.location;
    }

    public setLocation(l: Location)
    {
        this.location = l;
    }
}