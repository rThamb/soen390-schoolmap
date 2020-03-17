import {IonicStorageModule} from '@ionic/storage'


/**
 * POD object responsible for holding User's preferences regarding app functionality.
 */
export class UserSettings
{
    public useElevator: boolean;
    public useStairs: boolean;
    public useEscalators: boolean;

    public languagePreference: string;

    public googleSync: boolean;

    constructor()
    {
       
    }
}