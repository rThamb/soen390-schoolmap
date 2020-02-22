import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Floor } from '../models/Floor';

declare var require: any;
const pf = require('pathfinding');


@Injectable({
  providedIn: 'root'
})
export class IndoorPathingService {

  public floorLayoutsDirectory: string;

  constructor() 
  { 
    this.floorLayoutsDirectory = '../../assets/binary_floor_layouts/';
  }

  getPath(startLocation:Location, endLocation:Location)
  {

    binaryFloorGrid = 
  }

  getBinaryGrid(floor: string)
  {
    let fileName = this.getFloorFileNameFromTag(floor);


  }

  getFloorFileNameFromTag(fileName: string)
  {
    return 'H8-floor.txt';
  }
}
