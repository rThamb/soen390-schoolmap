import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import { MapComponent} from '../../components/map/map.component'
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service' 
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service'
<<<<<<< HEAD
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
=======
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service' 
>>>>>>> UC 47: Introduced method to determine if user destination building.

//models 
import { Building } from '../../models/Building'
import { Floor } from '../../models/Floor'
import { Location } from '../../models/Location'
import { Transitions } from '../../models/Transitions'




declare var google

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent{

  @ViewChild('map', {static: false}) mapHandle: MapComponent;

  directionsService = new google.maps.DirectionsService;
  directionsRenderer = new google.maps.DirectionsRenderer;
  directions = {}
  shuttleTimeValue = "";
  travelDistance = "";
  travelDuration = "";
  map:any;

  //Possible key words that would be searched to get either of the campuses
  sgwCampus = ["concordia","concordia university", "concordia downtown","downtown concordia","sir george william","sir george williams","hall building", "hall","concordia montreal","montreal concordia","H3G 1M8","1455 boulevard de maisonneuve o","1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8"];
  loyolaCampus=["concordia loyola", "loyola concordia", "campus loyola", "loyola campus", "loyola", "layola", "H4B 1R6", "7141 sherbrooke", "7141 Sherbrooke St W, Montreal, Quebec H4B 1R6"];


  constructor(private geolocation: Geolocation, private mapSrevice : MapService, private storage: Storage,
              private indoorService: IndoorPathingService,
<<<<<<< HEAD
              private buildFactoryService: BuildingFactoryService) 
  {
    storage.ready().then(() => {
      storage.get('newRouteDest').then((value) => {
        console.log(value);
        if(value != null || value != undefined || value != '')
        {
          this.directions['destination'] = value;
        }
      })
    });
  }
=======
              private buildFactoryService: BuildingFactoryService,
              private gpsMapService: GpsGridMappingService) { }
>>>>>>> UC 47: Introduced method to determine if user destination building.

  

  setMap(){
    
    //retrieves an instance of the map (with the overlays) via a service
    this.map = this.mapSrevice.getMap();
    
    //creates a div to display the directions in text for the user, very ugly and needs to be reworked in terms of look
    this.directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    this.directionsRenderer.setMap(this.map);

    //to display/hide next shuttle time
    if(this.isShuttle())
      document.getElementById('shuttletime').style.display = "block";
    else
      document.getElementById('shuttletime').style.display = "none";
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

  validateInput(input: string): string {
    if(this.isSGW(input))
      return "1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8"
    else if(this.isLoyola(input))
      return "7141 Sherbrooke St W, Montreal, Quebec H4B 1R6"
    else
      return input
  }

  //Uses the google API to determine the route and draws the path on the map or 
  //Show indoor paths.
  getDirections() {
    //this is a reference to the map
    this.setMap();
    var travelMode = this.getTransportation()
    var directionsPanel = document.getElementById('directionsPanel')
    var clearDirections = document.getElementById('clearDirections')
    let directionsForm = document.getElementById('form') 


    //-----------------------------------------
  
    let start = this.directions['start'];
    let destination = this.directions['destination'];

    
    if(this.useIndoorDirections(start, destination)){
      //**** remove outdoor route if enable 

      //focus the map onto building
      this.mapHandle.showHallBuildingIndoor();
      this.drawIndoorPath(start, destination);
    }
    else{
      //use out directions

      //quit indoor mode if enabled
      this.mapHandle.quitIndoorMode();

      this.directionsService.route({
      origin: this.validateInput(this.directions['start']),
      destination: this.validateInput(this.directions['destination']),
      travelMode: travelMode,
      }, (response, status) => {
      if (status === 'OK') {
        this.displayTravelInfo(response);
        this.directionsRenderer.setDirections(response);
        directionsForm.style.display="none";
        directionsPanel.style.display="block";
        clearDirections.style.display="block";
      } else {
        window.alert('Request to directions API failed: ' + status);
      }
    });
    }
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

  //Method for clearing the map of the line, removing text directions and enabling the to/from view
  clearDirections() {
    let directionsForm = document.getElementById('form')

    if(this.directionsRenderer != null)
    {  
      this.directionsRenderer.setMap(null);
      directionsForm.style.display="block";
      document.getElementById('travelinfo').style.display="none"
      document.getElementById('directionsPanel').style.display="none"
      document.getElementById('clearDirections').style.display="none"
    }
  }

  async useCurrentLocation(){

    let userLocation = await this.geolocation.getCurrentPosition().catch((error) => {
      console.log('Error getting location', error);
    });

    if(userLocation)
      this.directions['start'] = userLocation.coords.latitude + "," + userLocation.coords.longitude;
    else
      window.alert("Location services must be enabled in order to access your current location.");

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




  /**
   * ---------------------------------------------------------------------------
   *  
   * The methods below are used for indoor pathing
   * 
   * 
   * 
   * -----------------------------------------------------------------------------------
   */




  //check if indoor directions required
  useIndoorDirections(start: string, dest: string){
    
    //preform some check to determine if indoor is need

    //check if start and destination are 

    //1. check if within a length
    
    if(start.length == 5 || start.length == 6){
      if(dest.length == 5 || dest.length == 6){

        let startBuildCode = start.substring(0,2);
        let startBuildFloor = start.substring(2, start.length - 1);
        let endBuildCode = dest.substring(0,2); 
        let endBuildFloor = dest.substring(2, dest.length - 1);

        let cond1 = !this.checkAllNums(startBuildCode);
        let cond2 = this.checkAllNums(startBuildFloor);

        let cond3 = !this.checkAllNums(endBuildCode);
        let cond4 = this.checkAllNums(endBuildFloor);

        return cond1 && cond2 && cond3 && cond4;
      }  
    }
    
    return false;   
  }

  private checkAllNums(val: string){
    let onlyNum = /^\d+$/.test(val);
    return onlyNum;
  }

  async drawIndoorPath(start: string, end: string){
    
    let buildingCode = this.getBuildingCode(start);
    let floorLevel = this.getFloorNum(start, buildingCode);

    let building : Building = await this.buildFactoryService.loadBuilding(buildingCode); 
    let currentFloor: Floor = building.getFloorLevel(floorLevel + "");
    let classToClass = this.indoorService.determineRouteClassroomToClassroom(start, end, building, currentFloor, Transitions.Escalator);

    //set transition map
    this.mapHandle.setTransitionsPaths(classToClass);   
  }


  async userInStartBuilding(userPosition: Location, destination: string){

    //this method is used when
    let building : Building = await this.buildFactoryService.loadBuilding(this.getBuildingCode(destination));

    let userInBuilding : boolean = this.gpsMapService.userInBuilding(userPosition, 
      building.getFloorLevel(this.getFloorNum(destination, building.getBuildingKey()) + ""));

    return true;
  }
  private getFloorNum(start: string, buildingCode: string){
    return Math.trunc(parseInt(start.replace(buildingCode, "")) / 100);
  }

  private getBuildingCode(start: string){
    return start.substring(0,2);
  }



}
