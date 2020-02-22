import { Component,ViewChild } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent{

@ViewChild('map') mapElement;
map:any;

  constructor() { }

  ngOnInit() {
  this.LoyolaMap();
  }

LoyolaMap(){
let latLng = new google.maps.LatLng(45.458233, -73.640472);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP, 
   }
this.map= new google.maps.Map(this.map.nativeElement,mapOptions);
}
}

