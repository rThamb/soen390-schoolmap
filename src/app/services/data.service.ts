import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
// Temp class for testing
export class DataService {
    constructor(private http: HttpClient) {}
    getLocalData() {
        // return observables
        return this.http.get('/assets/data/classRooms.json');
    }

}
