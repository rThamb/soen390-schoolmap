import { Component, AfterViewInit, ViewChild, ElementRef, } from '@angular/core';
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
  

  constructor(private geolocation: Geolocation) { 
      this.userLocation = new Location(0, 0 ,0);
  }

  ngAfterViewInit(): void{
    this.getCurrentLocation(15);
  }

  getCurrentLocation(x:number): void{
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLocation = new Location(resp.coords.longitude, resp.coords.latitude, resp.coords.altitude);
      this.showMap(x);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  showMap(x:number){

    var mylocation = new google.maps.LatLng(this.userLocation.latitude,this.userLocation.longitude);
    
    var mapOptions = {
      zoom: x,
      center: mylocation,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.googleMap.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
      position: mylocation,
      map: this.map,
      title: 'Here'
    });
  }

}
