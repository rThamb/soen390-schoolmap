import { Component, OnInit, AfterViewInit} from '@angular/core';
import {MapService} from '../../services/map/map.service';

declare var google

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent{

  
  directionsService = new google.maps.DirectionsService;
  directionsRenderer = new google.maps.DirectionsRenderer;
  directions = {}
  shuttleTimeValue = "";
  travelDistance = "";
  travelDuration = "";
  map:any;

  //Possible key words that would be searched to get either of the campuses
  sgwCampus = ["concordia","concordia university", "concordia downtown","downtown concordia","sir george william","sir george williams","hall building","concordia montreal","montreal concordia","H3G 1M8","1455 boulevard de maisonneuve o"];
  loyolaCampus=["concordia loyola", "loyola concordia", "campus loyola", "loyola campus", "loyola", "layola", "H4B 1R6", "7141 sherbrooke"];


  constructor(private mapSrevice : MapService) { }

  

  setMap(){
    
    //retrieves an instance of the map (with the overlays) via a service
    this.map = this.mapSrevice.getMap();
    
    //creates a div to display the directions in text for the user, very ugly and needs to be reworked in terms of look
    //this.directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    this.directionsRenderer.setMap(this.map);

    //temporary: to display next shuttle time
    if(this.isShuttle())
      document.getElementById('shuttletime').style.display = "block";
  }


  //verifies is a given input fields alludes to the downtown campus
  isSGW(inputField: string):boolean{
    if(inputField)
      inputField = inputField.toLowerCase();
    if(this.sgwCampus.includes(inputField))
      return true;
    else
      return false;
  }
  
  //verifies is a given input fields alludes to the loyola campus
  isLoyola(inputField: string):boolean{
    if(inputField)
      inputField = inputField.toLowerCase();
    if(this.loyolaCampus.includes(inputField))
      return true;
    else
      return false;
  }

  /*
  *determines if give input field is one of the 2 schools 
  */
  isSchool(inputField: string):boolean {
    if(inputField)
      inputField = inputField.toLowerCase();
    if(this.sgwCampus.includes(inputField) || this.loyolaCampus.includes(inputField))
      return true;
    else
      false;
  }

  //determines if the user is travelling between campuses, if so suggest the shuttle bus
  displayShuttle(){
    let start = this.directions['start'];
    let destination = this.directions['destination'];
    let shuttleDisplay = document.getElementById('shuttle');
    
    if(start && destination){
      start = start.toLowerCase();
      destination = destination.toLowerCase();
    }

    if(this.isSchool(start) && this.isSchool(destination)){
      if(this.isSGW(start) && this.isLoyola(destination)) {
        this.getNextShuttleTime('SGW').then((nextShuttleTime) => {
          if(nextShuttleTime){
            shuttleDisplay.style.display="block";
            this.shuttleTimeValue = "Next shuttle: \n" + nextShuttleTime.getHours() + ":" + (nextShuttleTime.getMinutes() < 10 ? '0' + nextShuttleTime.getMinutes() : nextShuttleTime.getMinutes());
          }
        });
      }
      else if(this.isLoyola(start) && this.isSGW(destination)) {
        this.getNextShuttleTime('loyola').then((nextShuttleTime) => {
          if(nextShuttleTime){
            shuttleDisplay.style.display="block";
            this.shuttleTimeValue = "Next shuttle: \n" + nextShuttleTime.getHours() + ":" + (nextShuttleTime.getMinutes() < 10 ? '0' + nextShuttleTime.getMinutes() : nextShuttleTime.getMinutes());
          }
        });
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

  displayTravelInfo(response: any) {
    let infoPanel = document.getElementById('travelinfo');
    this.travelDistance = "Distance: \n" + response.routes[0].legs[0].distance.text;
    
    if (this.isShuttle() === "SHUTTLE")
      this.travelDuration = "ETA: \n30 mins";
    else
      this.travelDuration = "ETA: \n" + response.routes[0].legs[0].duration.text;
    
    infoPanel.style.display = "block";
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
        this.displayTravelInfo(response);
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

  //Given the departure campus, retrieves the time of next shuttle bus leaving that campus (if any)
  async getNextShuttleTime(departureCampus){
    
    let res = await fetch("./assets/shuttle_bus/departureTimes.json");
    let json = await res.json();
    let currentDate = new Date('2020-03-18 10:00');

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
