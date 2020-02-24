import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Location} from "../../models/Location";
import {Geolocation} from "@ionic-native/geolocation/ngx";

declare var google;

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  //
  //
  //   implements AfterViewInit {
  //
  // map1;
  // map2;
  // @ViewChild('googleMap', {static: false}) googleMap: ElementRef;
  //
  // private userLocation: Location;
  //
  // loyolaLoc:Location;
  // sgwLoc:Location;
  //
  // constructor(private geolocation: Geolocation) {
  //   this.userLocation = new Location(0, 0 ,0);
  //   this.loyolaLoc = new Location(45.458227, -73.640460, 0);
  //   this.sgwLoc = new Location(45.494553, -73.577388, 0);
  // }
  //
  // ngAfterViewInit(): void{
  //   this.getCurrentLocationInLoyola();
  //   this.getCurrentLocationInSGW();
  // }
  //
  // getCurrentLocationInLoyola(): void{
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.userLocation = new Location(resp.coords.longitude, resp.coords.latitude, resp.coords.altitude);
  //     this.showLoyolaMap(this.userLocation.latitude, this.userLocation.longitude);
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  //
  // } getCurrentLocationInSGW(): void{
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.userLocation = new Location(resp.coords.longitude, resp.coords.latitude, resp.coords.altitude);
  //     this.showSGWMap(this.userLocation.latitude, this.userLocation.longitude);
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }
  //
  // showLoyolaMap(lat:number, long:number){
  //   let myLocation = new google.maps.LatLng(lat, long);
  //   let loyolaMap: { mapTypeId: any; center: { lng: number; lat: number }; zoom: number } = {
  //     zoom: 15,
  //     center: {lat: 45.458227, lng: -73.640460},
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   this.map1 = new google.maps.Map(this.googleMap.nativeElement, loyolaMap);
  //   let marker = new google.maps.Marker({
  //     position: myLocation,
  //     map: this.map1,
  //     title: 'Here'
  //   });
  // }
  //
  //
  // showSGWMap(lat:number, long:number){
  //   let myLocation = new google.maps.LatLng(lat, long);
  //   let sirGeorgeMap: { mapTypeId: any; center: { lng: number; lat: number }; zoom: number } = {
  //     zoom: 15,
  //     center: {lat: 45.458227, lng: -73.640460},
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   this.map2 = new google.maps.Map(this.googleMap.nativeElement, sirGeorgeMap);
  //
  //   let marker = new google.maps.Marker({
  //     position: myLocation,
  //     map: this.map1,
  //     title: 'Here'
  //   });
  // }


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



