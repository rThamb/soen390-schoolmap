import {Component,ViewChild, ElementRef} from '@angular/core';

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
    
    //creates an instance of the map to use in the backend, HOWEVER this create a new google map, need to change to use our own map
    var map = new google.maps.Map(document.getElementById('map'));

    //creates a div to display the directions in text for the user, very ugly and needs to be reworked in terms of look
    this.directionsRenderer.setPanel(document.getElementById('directionsPanel'));
    this.directionsRenderer.setMap(map);
  }

  //Verifies is the user selected walking as their method of transportation
  isWalking(): string{
    var button = document.getElementById('walking');
    if(button.classList.contains('segment-button-checked')) {
      return "WALKING"
    }
  }

  //Verifies is the user selected driving as their method of transportation
  isDriving(): string{
    var button = document.getElementById('driving');
    if(button.classList.contains('segment-button-checked')) {
      return "DRIVING"
    }
  }

  //Verifies is the user selected wpublic transit as their method of transportation
  isTransit(): string{
    var button = document.getElementById('transit');
    if(button.classList.contains('segment-button-checked')) {
      return "TRANSIT"
    }
  }

  //Determines which of the 3 available modes of transportation was selected
  getTransportation():string{
    if(this.isWalking() === "WALKING"){
      return("WALKING")
    }
    else if (this.isTransit() === "TRANSIT"){
      return("TRANSIT")
    }
    else{
      return("DRIVING")
    }
  }

  //Uses the google API to determin the route and draws the path on the map
  getDirections() {
    //this is a reference to the map
    this.setMap();
    var travelMode = this.getTransportation()

    this.directionsService.route({
      origin: this.directions['start'],
      destination: this.directions['destination'],
      travelMode: travelMode
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response);
      } else {
        window.alert('Request to directions API failed: ' + status);
      }
    });
  }
  

}
