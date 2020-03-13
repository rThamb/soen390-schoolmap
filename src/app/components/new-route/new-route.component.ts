import {Component} from '@angular/core';

declare var google

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.scss'],
})


export class NewRouteComponent  {
  
  directionsService = new google.maps.DirectionsService;
  directionsRenderer = new google.maps.DirectionsRenderer;
  directions = {}

  constructor() { }

  setMap(){
    var map = new google.maps.Map(document.getElementById('map'));
    this.directionsRenderer.setMap(map);
  }

  getDirections() {

    this.setMap();

    this.directionsService.route({
      origin: this.directions['start'],
      destination: this.directions['destination'],
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        console.log("directions Working")
        this.directionsRenderer.setDirections(response);
      } else {
        window.alert('Request to directions API failed: ' + status);
      }
    });
  }
  

}
