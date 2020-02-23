import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ReadGridService {

  data:any;

  constructor()
  {
  }

  //Accepts a string, which represents a key in the floorMaps.json file, and return the value
  async createGrid(keyName: string)
  {

    var keyValue; //Value of the key in Json file

    await fetch('./assets/floorMaps.json').then(res => res.json())
    .then(json => {
      this.data = json;

    
    keyValue = this.data[keyName];
    })
    .catch(error =>
      {
        console.log("This file does not exist");
      });

    return keyValue;

  }

}
