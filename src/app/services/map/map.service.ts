import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  map: any = undefined;
  
  setMap(map:any){
    this.map = map;
    console.log(this.map);
  }
  
  getMap():any {
    console.log(this.map);
    return this.map;
  }
  
}
