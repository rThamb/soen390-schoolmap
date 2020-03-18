import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  map: any = undefined;
  
  setMap(map:any){
    this.map = map;
  }
  
  getMap():any {
    return this.map;
  }
  
}