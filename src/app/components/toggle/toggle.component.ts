import { AfterViewInit, Component, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import {Location} from "../../models/Location";
import {Geolocation} from "@ionic-native/geolocation/ngx";

declare var google;

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  
  
  //map:any;
  
  @Output() togglelocateev=new EventEmitter();
  loyolaloc :Location= new google.maps.LatLng(45.458234,-73.640493,0);
  sirgeorge= new google.maps.LatLng(45.494711 ,-73.577871,0);
  
  constructor() { }

  ngOnInit() {
  }
  callparentloy(){
    this.togglelocateev.emit(this.loyolaloc);
  }
  callparentsgw(){
    this.togglelocateev.emit(this.sirgeorge);
  }

  }






