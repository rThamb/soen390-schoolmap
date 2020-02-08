import { Component, NgModule, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '../../models/Location';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {FormsModule} from '@angular/forms';
import {MapComponent} from '../map/map.component';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})

export class ToggleComponent implements OnInit {

  status = false;

  constructor() { }

  ngOnInit() {
  
  }

  onChange()
  { 
    if(!this.status)
    {
      console.log("true")
      this.status = true;

      
    }
    else
    {
      console.log("false")
      this.status = false;
    }
  }
}




