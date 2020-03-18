import {Course} from './Course'

/**
 * Represent's the user's concordia school schedule that is used by the system in order to find Course information
 */
export class UserSchedule
{
    private courses: Course[];

    constructor()
    {
    
    }

    public getCourses()
    {
        return this.courses;
    }

    public setCourses(c: Course[])
    {
        this.courses = c;
    }
}