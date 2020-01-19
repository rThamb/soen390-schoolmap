import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiKeysService {

  keys = {
    "googleMaps": ""
  }; 

  constructor() { }

  getKey(type: string): any{
    return this.keys[type];
  }


}
