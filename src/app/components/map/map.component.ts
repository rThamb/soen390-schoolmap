import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


//May have to remove
import { Location } from '../../models/Location';


declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  map;

  @ViewChild('googleMap', {static: false}) googleMap: ElementRef; 

  private userLocation: Location;

  loyolaLoc:Location;
  sgwLoc:Location;

  constructor(private geolocation: Geolocation) { 
      this.userLocation = new Location(0, 0 ,0);
      this.loyolaLoc = new Location(45.458227, -73.640460, 0);
      this.sgwLoc = new Location(45.494553, -73.577388, 0);
  }

  ngAfterViewInit(): void{
      this.getCurrentLocation();
  }

  getCurrentLocation(): void{
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLocation = new Location(resp.coords.longitude, resp.coords.latitude, resp.coords.altitude);
      this.showMap(this.userLocation.latitude, this.userLocation.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  showMap(lat:number, long:number){

    let mylocation = new google.maps.LatLng(lat, long);

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
  }

}
