import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import { MapComponent} from '../../components/map/map.component';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';
import { GpsGridMappingService } from '../../services/gps-grid-mapping/gps-grid-mapping.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute, Router } from '@angular/router';

// models
import { Building } from '../../models/Building';
import { Floor } from '../../models/Floor';
import { Location } from '../../models/Location';
import { Transitions } from '../../models/Transitions';
import { NewRouteComponent } from '../new-route/new-route.component';


declare var google;

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent {

  // @ViewChild('map', {static: false})
  mapHandle: MapComponent;

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directions = {};

  shuttleTimeValue = '';
  travelDistance = '';
  travelDuration = '';
  tripCost = '';
  map: any;
  favorited: boolean = false;

  // Possible key words that would be searched to get either of the campuses
  sgwCampus = ['concordia', 'concordia university', 'concordia downtown', 'downtown concordia', 'sir george william', 'sir george williams', 'hall building', 'hall', 'concordia montreal', 'montreal concordia', 'H3G 1M8', '1455 boulevard de maisonneuve o', '1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8'];
  loyolaCampus = ['concordia loyola', 'loyola concordia', 'campus loyola', 'loyola campus', 'loyola', 'layola', 'H4B 1R6', '7141 sherbrooke', '7141 Sherbrooke St W, Montreal, Quebec H4B 1R6'];

  constructor(private geolocation: Geolocation,
              private mapSrevice : MapService,
              private storage: Storage,
              private indoorService: IndoorPathingService,
              private buildFactoryService: BuildingFactoryService,
              private gpsMapService: GpsGridMappingService,
              private route: ActivatedRoute,
              private router: Router) {

    storage.ready().then(() => {
      storage.get('newRouteDest').then((value) => {
        // console.log(value);
        if (value != null && value != undefined && value != '') {
          this.directions['destination'] = value;
          storage.set('newRouteDest', null); // Inside "direction"
        }
      });
    });

    this.translatePage();

    if (this.directions['start'] == '' || this.directions['start'] == null || this.directions['start'] == undefined) {
      this.storage.ready().then(() => {
        this.storage.get('languagePreference').then((lP) => {
          if (lP === 'English') {
            this.directions['start'] = 'My Location';
          } else if (lP === 'French') {
            this.directions['start'] = 'Ma Position';
          }

        });

      });

    }

    // If user has been routed to new route page from favorites page, value for destination is set.
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.directions['destination'] = JSON.parse(params.special).destination;
      }
    });

  }

  toggleFavorite() {
    this.favorited = !this.favorited;
  }

  setMap() {

    // retrieves an instance of the map (with the overlays) via a service
    this.map = this.mapSrevice.getMap();
    this.mapHandle = this.mapSrevice.getActiveMapComponent();

    this.directionsRenderer.setPanel(document.getElementById('directionsPanel'));

    this.directionsRenderer.setMap(this.map);

    // to display/hide next shuttle time
    if (this.isShuttle()) {
      document.getElementById('shuttletime').style.display = 'block';
    } else {
      document.getElementById('shuttletime').style.display = 'none';
    }
  }


  // verifies is a given input fields alludes to the downtown campus
  isSGW(inputField: string): boolean {
    if (inputField) {
      inputField = inputField.toLowerCase();
    }
    if (this.sgwCampus.includes(inputField)) {
      return true;
    } else {
      return false;
    }
  }

  // verifies is a given input fields alludes to the loyola campus
  isLoyola(inputField: string): boolean {
    if (inputField) {
      inputField = inputField.toLowerCase();
    }
    if (this.loyolaCampus.includes(inputField)) {
      return true;
    } else {
      return false;
    }
  }

  /*
  *determines if give input field is one of the 2 schools
  */
  isSchool(inputField: string): boolean {
    if (inputField) {
      inputField = inputField.toLowerCase();
    }
    if (this.sgwCampus.includes(inputField) || this.loyolaCampus.includes(inputField)) {
      return true;
    } else {
      false;
    }
  }

  // determines if the user is travelling between campuses, if so suggest the shuttle bus
  displayShuttle() {
    let start = this.directions['start'];
    let destination = this.directions['destination'];
    const shuttleDisplay = document.getElementById('shuttle');

    if (start && destination) {
      start = start.toLowerCase();
      destination = destination.toLowerCase();
    }

    if (this.isSchool(start) && this.isSchool(destination)) {
      if (this.isSGW(start) && this.isLoyola(destination)) {
        this.getNextShuttleTime('SGW').then((nextShuttleTime) => {
          if (nextShuttleTime) {
            shuttleDisplay.style.display = 'block';
            this.shuttleTimeValue = 'Next shuttle: \n' + nextShuttleTime.getHours() + ':' + (nextShuttleTime.getMinutes() < 10 ? '0' + nextShuttleTime.getMinutes() : nextShuttleTime.getMinutes());
          }
        });
      } else if (this.isLoyola(start) && this.isSGW(destination)) {
        this.getNextShuttleTime('loyola').then((nextShuttleTime) => {
          if (nextShuttleTime) {
            shuttleDisplay.style.display = 'block';
            this.shuttleTimeValue = 'Next shuttle: \n' + nextShuttleTime.getHours() + ':' + (nextShuttleTime.getMinutes() < 10 ? '0' + nextShuttleTime.getMinutes() : nextShuttleTime.getMinutes());
          }
        });
      }
    } else {
      shuttleDisplay.style.display = 'none';
    }

  }

  // Verifies is the user selected walking as their method of transportation
  isWalking(): string {
    const button = document.getElementById('walking');
    if (button.classList.contains('segment-button-checked')) {
      return 'WALKING';
    }
  }

  // Verifies is the user selected driving as their method of transportation
  isDriving(): string {
    const button = document.getElementById('driving');
    if (button.classList.contains('segment-button-checked')) {
      return 'DRIVING';
    }
  }

  // Verifies is the user selected wpublic transit as their method of transportation
  isTransit(): string {
    const button = document.getElementById('transit');
    if (button.classList.contains('segment-button-checked')) {
      return 'TRANSIT';
    }
  }

  // Verifies is the user selected wpublic transit as their method of transportation
  isShuttle(): string {
    const button = document.getElementById('shuttle');
    if (button.classList.contains('segment-button-checked')) {
      return 'SHUTTLE';
    }
  }

  // Determines which of the 3 available modes of transportation was selected
  getTransportation(): string {
    if (this.isWalking() === 'WALKING' || this.isShuttle() === 'SHUTTLE') {
      return('WALKING');
    } else if (this.isTransit() === 'TRANSIT') {
      return('TRANSIT');
    } else {
      return('DRIVING');
    }
  }

  displayTravelInfo(response: any) {
    const infoPanel = document.getElementById('travelinfo');
    this.travelDistance = 'Distance:\n' + response.routes[0].legs[0].distance.text;

    // Set default travel time fir shuttle bus
    if (this.isShuttle() === 'SHUTTLE') {
      this.travelDuration = 'ETA:\n30 mins';
      this.displayShuttle();
    } else {
      this.travelDuration = 'ETA:\n' + response.routes[0].legs[0].duration.text;
      document.getElementById('shuttletime').style.display = 'none';
    }

    // To display the cost of the trip
    if (this.isTransit() === 'TRANSIT') {
      this.getTripCost(response);
      document.getElementById('tripCost').style.display = 'block';
    } else  {
      this.tripCost = '';
      document.getElementById('tripCost').style.display = 'none';
    }
    infoPanel.style.display = 'block';
    }

  // Verifies if the returned google response has a fare cost available and call a method to display it
  getTripCost(directionsResponse: JSON) {
    if (directionsResponse['routes'][0].fare) {
      this.tripCost = 'Trip Cost:\n' + directionsResponse['routes'][0].fare.text;
    } else {
      this.tripCost = 'Trip Cost:\nIs Unavailable';
    }
  }

  validateInput(input: string): string {
    if (this.isSGW(input)) {
      return '1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8';
    } else if (this.isLoyola(input)) {
      return '7141 Sherbrooke St W, Montreal, Quebec H4B 1R6';
 } else {
      return input;
 }
  }

  // Uses the google API to determine the route and draws the path on the map or
  // Show indoor paths.
  async getDirections() {
    // this is a reference to the map
    this.setMap();

    const start = this.directions['start'];
    const destination = this.directions['destination'];
    const directions = {Start: start, Destinations: destination};

    if (await this.useIndoorDirections(start, destination)) {
      this.preformIndoorDirectionsActivity(start, destination, true);
      this.addToHistory(JSON.stringify(directions));
    } else if ((start === 'My Location' || start === 'Ma Position') && await this.isCampusIndoorPOI(destination)) {
        // indoor and outdoor will only be supported when using user position
        this.useBothIndoorAndOutdoor(destination);
        this.addToHistory(JSON.stringify(directions));
    } else {
      this.preformOutdoorDirectionsActivity(start, destination);
    }

    // If user has toggled the favorite star, the destination will be added to their favorites.
    if (this.favorited) {
      this.addDestinationToFavorites(this.directions['destination']);
    }

  }

  /**
   * Used to preform ALL work when outdoor path is needed to be drawn.
   * @param start
   * @param destination
   */
  preformOutdoorDirectionsActivity(start: string, destination: string) {

    const travelMode = this.getTransportation();
    const directionsPanel = document.getElementById('directionsPanel');
    // var clearDirections = document.getElementById('clearDirections')
    const directionsForm = document.getElementById('form');
    const directions = {Start: start, Destinations: destination};
    this.directionsService.route({
      origin: this.validateInput(start),
      destination: this.validateInput(destination),
      travelMode,
      }, (response, status) => {
      if (status === 'OK') {
        console.log(response);
        this.displayTravelInfo(response);
        this.directionsRenderer.setDirections(response);
        directionsForm.style.display = 'none';
        this.showClearDirectionControls();
        directionsPanel.style.display = 'block';
        // clearDirections.style.display="block";
        this.addToHistory(JSON.stringify(directions));
      } else {
        window.alert('Request to directions API failed: ' + status);
      }
    });

  }

  // Returns the current date in the following format: Day, Month Date, Year
  getDate(): string {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate  = new Date().toLocaleDateString('en-US', options);

    return currentDate;
  }


  // If the current date is not already stored in the history, store it
  setCurrentDateInHistory(history: JSON): any {
    const length = history['dates'].length;
    const date = this.getDate();

    if (length === 0) {
      history['dates'][0] = {[date]: [{}]};
      this.storage.set('history', JSON.stringify(history));
    } else {
      for (const key in history['dates'][length - 1]) {
        if (key !== date) {
          history['dates'][length] = {[date]: [{}]};
          this.storage.set('history', JSON.stringify(history));
        } else {
          console.log('date already stored at last index: ' + (length - 1));
        }
      }
    }
  }


  // Given the directions, start and destination, append it to the list in the storage, by dates
  async addToHistory(directions: string) {
    let history = await this.storage.get('history').catch((error) => {
      console.log('Error getting history', error);
    });

    const parsedDirections = JSON.parse(directions);
    history = JSON.parse(history);

    const currentDate = this.getDate();
    let length = history.dates.length;
    const loggedDate = Object.keys(history.dates[length - 1])[0];

    if (this.isCurrentDateLogged(loggedDate)) {

      length = history.dates.length;

      if (JSON.stringify(history.dates[length - 1][currentDate][0]) === '{}') {
        history.dates[length - 1][currentDate][0] = parsedDirections;
        this.storage.set('history', JSON.stringify(history));
      } else {
        const index = history.dates[length - 1][currentDate].length;
        const previousDirections = JSON.stringify(history.dates[length - 1][currentDate][index - 1]).toLowerCase();
        const minDirections = directions.toLowerCase();

        if (previousDirections !== minDirections) {
          history.dates[length - 1][currentDate][index] = parsedDirections;
          this.storage.set('history', JSON.stringify(history));
        }
      }
    } else {
      this.setCurrentDateInHistory(history);
      this.addToHistory(directions);
    }

    // console.log(history)
  }

  // Helper method to verify the last date stored vs the current date
  isCurrentDateLogged(loggedDate: string): boolean {
    const currentDate = this.getDate();

    if (currentDate === loggedDate) {
      return true;
    } else {
      return false;
    }
  }

  showClearDirectionControls() {
      const clearDirections = document.getElementById('clearDirections');
      clearDirections.style.display = 'block';

      const getDirBtn = document.getElementById('getDirectionsBtn');
      getDirBtn.style.display = 'none';
  }


  // Method for clearing the map of the line, removing text directions and enabling the to/from view
  clearDirections() {

    const directionsForm = document.getElementById('form');
    const getDirBtn = document.getElementById('getDirectionsBtn');

    if (this.directionsRenderer != null) {
      this.directionsRenderer.setMap(null);
      directionsForm.style.display = 'block';
      document.getElementById('travelinfo').style.display = 'none';
      document.getElementById('directionsPanel').style.display = 'none';
      document.getElementById('clearDirections').style.display = 'none';
      getDirBtn.style.display = 'block';
      this.directions['destination'] = '';
    }
    this.mapHandle.quitIndoorMode();

  }

  // This method is called by the button next to the "start" destination.
  async useCurrentLocation() {

    // This if statement is to switch between "My Location" and the latlng for "start" destination
    // if(this.directions['start'] != "My Location")
    // {
    //   this.directions['start'] = "My Location";
    // }

    // else
    {
      const userLocation = await this.geolocation.getCurrentPosition().catch((error) => {
        console.log('Error getting location', error);
      });

      if (userLocation) {
        this.directions['start'] = userLocation.coords.latitude + ',' + userLocation.coords.longitude;
      } else {
        window.alert('Location services must be enabled in order to access your current location.');
      }
    }
  }



  // Given the departure campus, retrieves the time of next shuttle bus leaving that campus (if any)
  async getNextShuttleTime(departureCampus) {

    const res = await fetch('./assets/shuttle_bus/departureTimes.json');
    const json = await res.json();
    const currentDate = new Date();

    // Only consider the shuttle bus schedule after 7:15 am on that particular day.
    const timeBeforeShuttleStarts = new Date(currentDate.toLocaleDateString('en-US') + ' ' + '7:15');
    const dayOfWeek = currentDate.getDay();
    let times = null;

    // Depending on which campus user is departing from and the day of the week, fetch the corresponding schedule.
    if (departureCampus === 'loyola') {
      if (dayOfWeek > 0 && dayOfWeek < 5) {
        times = json.mondayToThursday.fromLoyola;
      } else
        if (dayOfWeek === 5) {
          times = json.friday.fromLoyola;
      }
    } else {
      if (dayOfWeek > 0 && dayOfWeek < 5) {
        times = json.mondayToThursday.fromSGW;
      } else
        if (dayOfWeek === 5) {
          times = json.friday.fromSGW;
      }
    }

    /**
     * If it is a weekend or is not yet 7:15 am no shuttle bus time will be returned (returns null).
     * Else convert all times from strings to date objects and get the next shuttle departure time
     * (if any) given the current time.
     */
    let nextShuttleTime = null;
    if (times != null && currentDate >= timeBeforeShuttleStarts) {

      for (let i = 0; i < times.length; i++) {
        times[i] = new Date(currentDate.toLocaleDateString('en-US') + ' ' + times[i]);
      }

      let counter = 0;
      nextShuttleTime = times[counter];
      while (currentDate > nextShuttleTime && counter <= times.length) {
        nextShuttleTime = times[counter++];
      }
    }
    return nextShuttleTime;
  }

  // Adds a new location to the user's favorites.
  addDestinationToFavorites(location: string) {
    this.storage.get('favorites').then((val) => {
      if (val) {
        const value = JSON.parse(val);
        if (value.indexOf(location) === -1) {
          value.push(location);
          this.storage.set('favorites', JSON.stringify(value));
        }
      } else {
        const value = [location];
        this.storage.set('favorites', JSON.stringify(value));
      }
    });
  }


  /**
   * ---------------------------------------------------------------------------
   * The methods below are used for indoor pathing
   * -----------------------------------------------------------------------------------
   */


  /**
   * Used to preform ALL work when indoor path is needed to be drawn.
   * @param start
   * @param destination
   */
  async preformIndoorDirectionsActivity(start: string, destination: string, disableOutdoor: boolean) {
    // **** remove outdoor route if enable
    if (disableOutdoor) {
      this.clearDirections();
    }

    // focus the map onto building
    await this.mapHandle.showHallBuildingIndoor(true);
    this.drawIndoorPath(start, destination, null);
    this.showClearDirectionControls();
  }



  /**
   * Method is used to determine if classroom(start) to classroom(dest) routing is required.
   * @param start
   * @param dest
   */
  async useIndoorDirections(start: string, dest: string){
    
    if((start === 'My Location' || start === 'Ma Position'))
      return false;

    //check if start and end are both 2 classrooms in the same building
    let result = await this.isCampusIndoorPOI(start) && await this.isCampusIndoorPOI(dest);
    return result;
  }


  /**
   * Checks destination string to determine whether is exists in a concordia campus building.
   * @param dest
   */
  private async isCampusIndoorPOI(dest: string){
    //get building key from des
    let buildingCode = this.getBuildingCode(dest);
    let buildingObject: Building = await this.buildFactoryService.loadBuilding(buildingCode);

    if(buildingObject == null){
      let building: Building = await this.buildFactoryService.loadBuilding("HB");
      let poi = building.getIndoorPOIInBuilding(dest);
      return poi != null;
    }
    else
      return true;
  }

  /**
   * NOTE: This feature will only be supported when using User's current position as "start".
   *
   * The method is draw an outdoor route and indoor route based on start and end location.
   *
   * @param userPosition
   * @param dest
   */
  private async useBothIndoorAndOutdoor(dest: string){
  
    //get user position
    let user: Location = await this.gpsMapService.getUserCurrentPosition(); 

    debugger;
    //get building key from des
    let buildingCode = this.getBuildingCode(dest);
    let buildingObject: Building = await this.buildFactoryService.loadBuilding(buildingCode);
    let result = buildingObject != null;

    if(!result){
        buildingObject = await this.buildFactoryService.loadBuilding("HB");
        result = await buildingObject.getIndoorPOIInBuilding(dest) != null;
    }

    if(result){//if not null he wants to go to a valid classroom

      if(!this.gpsMapService.userInBuilding(user, buildingObject)){
        //should pass GoogleLngLat instead, hardcode start for now
        await this.preformOutdoorDirectionsActivity(user.getLat() + "," + user.getLng(), buildingObject.getBuildingName());
        let userIndoorStartLocation = buildingObject.getBuildingLocation();
        this.mapHandle.showHallBuildingIndoor(false);
        // hacky solution, need to set the start location for ground floor when arrived
        this.drawIndoorPath(buildingObject.getBuildingKey() + '800', dest, userIndoorStartLocation);
      }
    }
  }

  private checkAllNums(val: string) {
    const onlyNum = /^\d+$/.test(val);
    return onlyNum;
  }

  /**
   * Method interacts with the MapComponent to draw an indoor route in Google Maps.
   * @param start
   * @param end
   */
  async drawIndoorPath(start: string, end: string, userPosition: Location){
    
    let buildingCode = this.getBuildingCode(start);
    let floorLevel = this.getFloorNum(start, buildingCode);

    let building : Building = await this.buildFactoryService.loadBuilding(buildingCode);
    
    if(building == null){
      building = await this.buildFactoryService.loadBuilding("HB");
      floorLevel = building.getIndoorPOIInBuilding(start).getFloorNum();
    }
    
    let currentFloor: Floor = building.getFloorLevel(floorLevel + "");
    let path = null;

    const transition: Transitions = await this.getPreferedTransition();

    if(userPosition == null)
      path = this.indoorService.determineRoutePOIToPOI(start, end, building, currentFloor, transition);
    else
      path = this.indoorService.determineRouteToDestinationBasedOnUserPosition(userPosition, building, currentFloor, end, transition);

    // set transition map
    this.mapHandle.setTransitionsPaths(path);
  }



  private getFloorNum(start: string, buildingCode: string) {
    return Math.trunc(parseInt(start.replace(buildingCode, '')) / 100);
  }

  private getBuildingCode(start: string) {
    return start.substring(0, 2);
  }

  /**
   * Checks user's setting to determine the type of transition they prefer for indoor movements.
   */
  private async getPreferedTransition() {

    const useStairs = await this.storage.get('useStairs');
    const useEle = await this.storage.get('useElevator');
    const useEcs = await this.storage.get('useEscalator');

    if (useEcs) {
      return Transitions.Escalator;
    }

    if (useEle) {
      return Transitions.Elavator;
    }

    if (useStairs) {
      return Transitions.Stairs;
    }

    // default to escalator if nothing
    return Transitions.Escalator;
  }

  async translatePage() {
    const res = await fetch('/assets/Languages/language.json');
    const json = await res.json();

    this.storage.ready().then(() => {
      this.storage.get('languagePreference').then((lP) => {

        if (lP == null) {
          lP = 'English';
          this.storage.set('languagePreference', 'English');
        }
        if ( lP === 'English') {
          document.getElementsByName('start')[0].setAttribute('placeholder', json.english.placeholders.start);
          document.getElementsByName('destination')[0].setAttribute('placeholder', json.english.placeholders.destination);
          document.getElementById('getBtnText').innerHTML = json.english.directions.getDirBtn;
          document.getElementById('getClrText').innerHTML = json.english.directions.clearBtn;
        } else if ( lP === 'French') {
          document.getElementsByName('start')[0].setAttribute('placeholder', json.french.placeholders.start);
          document.getElementsByName('destination')[0].setAttribute('placeholder', json.french.placeholders.destination);
          document.getElementById('getBtnText').innerHTML = json.french.directions.getDirBtn;
          document.getElementById('getClrText').innerHTML = json.french.directions.clearBtn;
        }


      });
    });
  }

  private async isIndoorPOI(building: Building,  poiKey: string){
      let poi = building.getIndoorPOIInBuilding(poiKey);
      return poi != null;
  }

}
