import { AfterViewInit, Component, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import {Location} from "../../models/Location";
import {NgModule} from '@angular/core';
import {Geolocation} from "@ionic-native/geolocation/ngx";

declare var google;

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  
  @Output() toggleevent = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  callparentloy(){
    this.toggleevent.emit(new Location(45.458234, -73.640493, 0));
  }

  callparentsgw(){
    this.toggleevent.emit(new Location(45.494711, -73.577871, 0));
  }

  }






