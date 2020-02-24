import {Component, ViewChild} from '@angular/core';
declare var google;


@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent{

  @ViewChild('googleMap', {static: false}) googleMap;

  map:any;
  constructor() { }

  ngOnInit() {
  this.LoyolaMap();
  this.SirGeorgeMap();
  }

  //define coordinates for loyola map
  LoyolaMap() {
    let mylocation = new google.maps.LatLng(45.458234, -73.640493);
    let mapOptions: { mapTypeId: any; center: { lng: number; lat: number }; zoom: number } = {
      zoom: 16,
      center: {lat: 45.458234, lng: -73.640493},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.googleMap.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      position: mylocation,
      map: this.map,
      title: 'Here'
    });
    // testing to see if the segment button works
  
  }


  //define coordinates for sgw map
  SirGeorgeMap(){
    let mylocation = new google.maps.LatLng(45.494711 ,-73.577871);
    let mapOptions: { mapTypeId: any; center: { lng: number; lat: number }; zoom: number } = {
      zoom: 16,
      center: {lat: 45.494711, lng: -73.577871},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.googleMap.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      position: mylocation,
      map: this.map,
      title: 'Here'
    });
    // testing to see if the segment button works
    console.log("after clicking sgw");
    setTimeout(() => {
      console.log(this.googleMap, mapOptions);
    }, 10);
  }

}



