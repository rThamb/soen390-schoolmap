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

  //Possible key words that would be searched to get either of the campuses
  sgwCampus = ["concordia","concordia university", "concordia downtown","downtown concordia","sir george william","sir george williams","hall building","concordia montreal","montreal concordia","H3G 1M8","1455 boulevard de maisonneuve o"];
  loyolaCampus=["concordia loyola", "loyola concordia", "campus loyola", "loyola campus", "loyola", "layola", "H4B 1R6", "7141 sherbrooke"];


  constructor() { }

  setMap(){
    
    //creates an instance of the map to use in the backend, HOWEVER this create a new google map, need to change to use our own map
    var map = new google.maps.Map(document.getElementById('map'));

    //creates a div to display the directions in text for the user, very ugly and needs to be reworked in terms of look
    //this.directionsRenderer.setPanel(document.getElementById('directionsPanel'));
    this.directionsRenderer.setMap(map);
  }


  //verifies is a given input fields alludes to the downtown campus
  isSGW(inputField: string):boolean{
    inputField = inputField.toLowerCase();
    if(this.sgwCampus.includes(inputField))
      return true;
    else
      return false;
  }
  
  //verifies is a given input fields alludes to the loyola campus
  isLoyola(inputField: string):boolean{
    inputField = inputField.toLowerCase();
    if(this.loyolaCampus.includes(inputField))
      return true;
    else
      return false;
  }

  /*
  *--PROBABLY wont need this, directly check if its sgw or loyola--
  *determines if give input field is one of the 2 schools 
  */
  isSchool(inputField: string):boolean {
    inputField = inputField.toLowerCase();
    if(this.sgwCampus.includes(inputField) || this.loyolaCampus.includes(inputField))
      return true;
    else
      false;
  }

  //determines if the user is travelling between campuses, if so suggest the shuttle bus
  displayShuttle(){
    let start = this.directions['start'].toLowerCase();
    let destination = this.directions['destination'].toLowerCase();
    let shuttleDisplay = document.getElementById('shuttle');
    
    if(this.isSchool(start) && this.isSchool(destination)){
      if(this.isSGW(start) && this.isLoyola(destination)) {
        shuttleDisplay.style.display="block";
      }
      else if(this.isLoyola(start) && this.isSGW(destination)) {
        shuttleDisplay.style.display="block";
      }
    }
    else
    shuttleDisplay.style.display="none";

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

  //Verifies is the user selected wpublic transit as their method of transportation
  isShuttle(): string{
    var button = document.getElementById('shuttle');
    if(button.classList.contains('segment-button-checked')) {
      return "SHUTTLE"
    }
  }

  //Determines which of the 3 available modes of transportation was selected
  getTransportation():string{
    if(this.isWalking() === "WALKING" || this.isShuttle() === "SHUTTLE"){
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

  
  //This parametrized function is going to be used primarly for the indoor to outdoor feature
  getDirection(start:string, destination:string) {

    //this is a reference to the map
    this.setMap();
    
    //we Need to figure out how to dynamically get the users method of transportation
    var travelMode = this.getTransportation()

    this.directionsService.route({
      origin: start,
      destination: destination,
      travelMode: travelMode
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(response);
      } else {
        window.alert('Request to directions API failed: ' + status);
      }
    });
  }

  async getNextShuttleTime(departureCampus){
    
    let res = await fetch("./assets/shuttle_bus/departureTimes.json");
    let json = await res.json();
    let currentDate = new Date();

    //Only consider the shuttle bus schedule after 7:15 am on that particular day.
    let timeBeforeShuttleStarts = new Date(currentDate.toLocaleDateString('en-US') + " " + "7:15");
    let dayOfWeek = currentDate.getDay();
    let times = null;

    //Depending on which campus user is departing from and the day of the week, fetch the corresponding schedule.
    if(departureCampus == "loyola") {
      if(dayOfWeek > 0 && dayOfWeek < 5){
        times = json.mondayToThursday.fromLoyola;
      }else
        if(dayOfWeek == 5){
          times = json.friday.fromLoyola;
      }
    }else {
      if(dayOfWeek > 0 && dayOfWeek < 5){
        times = json.mondayToThursday.fromSGW;
      }else
        if(dayOfWeek == 5){
          times = json.friday.fromSGW;
      }
    }

    /**
     * If it is a weekend or is not yet 7:15 am no shuttle bus time will be returned (returns null).
     * Else convert all times from strings to date objects and get the next shuttle departure time
     * (if any) given the current time.
     */
    let nextShuttleTime = null; 
    if(times != null && currentDate >= timeBeforeShuttleStarts){
      
      for (let i = 0; i < times.length; i++)
        times[i] = new Date(currentDate.toLocaleDateString('en-US') + " " + times[i]);
    
      let counter = 0;
      nextShuttleTime = times[counter]; 
      while(currentDate > nextShuttleTime && counter <= times.length){
        nextShuttleTime = times[counter++];
      }
    }
    return nextShuttleTime;
  }
  

}
