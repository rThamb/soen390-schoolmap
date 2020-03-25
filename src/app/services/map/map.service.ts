import { Injectable } from '@angular/core';
import { MapComponent} from '../../components/map/map.component'


@Injectable({
  providedIn: 'root'
})

export class MapService {
  map: any = undefined;
  activeMapComponent: MapComponent;
  
  setMap(map:any){
    this.map = map;
  }
  
  getMap():any {
    return this.map;
  }

  setActiveMapComponent(mapComponent: MapComponent){
    this.activeMapComponent = mapComponent;
  }

  getActiveMapComponent(){
    return this.activeMapComponent;
  }

  
}