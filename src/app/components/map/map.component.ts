import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from '../../services/readGrid/read-grid.service';
import { Location } from '../../models/Location';
import { Floor } from '../../models/Floor';
import { BuildingFactoryService } from 'src/app/services/BuildingFactory/building-factory.service';
import { Campus } from 'src/app/models/Campus';
import { empty } from 'rxjs';
import { isTabSwitch } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { overlays } from './BuildingOverlayPoints'
import {User} from '../../models/User'


declare var google;

/**
 * MapComponent class. Contains the map object and attributes for all google map related services.
 * Also contains data for both campuses and is injected with our services.
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  @ViewChild('googleMap', {static: false}) googleMap: ElementRef;
 
  public map: any; // google.maps.Map
  private user: User;
  private mapOptions; // Object
  private userMarker; // google.maps.Marker

  private sgw: Campus;
  private loyola: Campus;

  // Injects the component class with imported services
  constructor(private geolocation: Geolocation, private buildingFactory: BuildingFactoryService, private indoorPathingService: IndoorPathingService, private myService: ReadGridService) 
  {
    this.loyola = new Campus(new Location(45.458234, -73.640493, 0));
    this.sgw = new Campus(new Location(45.494711, -73.577871, 0));
    this.user = new User();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  // Initializes the map object with default values
  async initMap(){
    // Gets current position of user
    const resp = await this.geolocation.getCurrentPosition();

    this.user.setLocation(new Location(resp.coords.latitude, resp.coords.longitude, 0));

    this.mapOptions = {
      center: this.user.getLocation().getGoogleLatLng(),
      zoom: 17,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.googleMap.nativeElement, this.mapOptions);

    this.userMarker = new google.maps.Marker({
      position: this.user.getLocation().getGoogleLatLng(),
      map: this.map,
      title: 'Here'
    });

    this.initOverlays();
  }

  // Gets the current location of user and focuses map to that point
  getCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.setLocation(new Location(resp.coords.latitude, resp.coords.longitude, 0));
      this.focusMap(this.user.getLocation());
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    return this.user.getLocation().getGoogleLatLng();
  }

  // Re-center the map based on location parameter
  focusMap(location) {
    this.map.setCenter(location.getGoogleLatLng());
    this.map.setZoom(17);
  }

  // Spawns the building overlays on top of the map
  // **WILL BE REFACTORED HEAVILY IN NEXT SPRINT**
  initOverlays()
  {

    // Refactor later: should use userMarker instead of userLocationMarker but info window doesnt open
    var userLocationMarker = new google.maps.Marker({
      position: this.getCurrentLocation(),
      map: this.map
    });

    var userInfoWindow = new google.maps.InfoWindow({content: ""});
    var userContent = "";
    
    // Polygon properties for all buildings
    var fColor = "deepskyblue";

    // Declare all overlay points
    var visualArts = overlays.visualArts.overlayPoints;
    var sjwCampus = overlays.sjwCampus.overlayPoints
    var loyolaCampus = overlays.loyolaCampus.overlayPoints;
    var hall = overlays.hall.overlayPoints;
    var molson = overlays.molson.overlayPoints;
    var faubourg = overlays.faubourg.overlayPoints;
    var EV = overlays.EV.overlayPoints;
    var LB = overlays.LB.overlayPoints;
    var greyNuns = overlays.greyNuns.overlayPoints;
    var scienceComplex = overlays.scienceComplex.overlayPoints;
    var journalismBuilding = overlays.journalismBuilding.overlayPoints;
    var chapel = overlays.chapel.overlayPoints;
    var psyBuilding = overlays.psyBuilding.overlayPoints;
    var stingerDome = overlays.stingerDome.overlayPoints;
    var stingerStadium = overlays.stingerStadium.overlayPoints;
    var centralBuilding = overlays.centralBuilding.overlayPoints;
    var vanierLibrary = overlays.vanierLibrary.overlayPoints;
    var adminBuilding = overlays.adminBuilding.overlayPoints;
    var jesuitHall = overlays.jesuitHall.overlayPoints;
    var athleticCamp = overlays.athleticCamp.overlayPoints;
    var loyolaGym = overlays.loyolaGym.overlayPoints;
    var phyServiceBuilding = overlays.phyServiceBuilding.overlayPoints;
    var centerArts = overlays.centerArts.overlayPoints;
    var saintIgnatius = overlays.saintIgnatius.overlayPoints;
    var structuralCenter = overlays.structuralCenter.overlayPoints;
    var jesuitResidence = overlays.jesuitResidence.overlayPoints;
    var studentResidences = overlays.studentResidences.overlayPoints;

    // Polygon for each campus
    var sjwP = new google.maps.Polygon({
      paths: [visualArts, sjwCampus],
      visible: false
    });
    sjwP.setMap(this.map);

    var loyolaP = new google.maps.Polygon({
      paths: loyolaCampus,
      visible: false
    });
    loyolaP.setMap(this.map);

    //Polygon for each building
    var hallP = new google.maps.Polygon({
      paths: hall,
      fillColor: fColor,
    });
    hallP.setMap(this.map);

    var molsonP = new google.maps.Polygon({
      paths: molson,
      fillColor: fColor,
    });
    molsonP.setMap(this.map);

    var faubourgP = new google.maps.Polygon({
      paths: faubourg,
      fillColor: fColor,
    });
    faubourgP.setMap(this.map);

    var EVP = new google.maps.Polygon({
      paths: EV,
      fillColor: fColor,
    });
    EVP.setMap(this.map);

    var lbP = new google.maps.Polygon({
      paths: LB,
      fillColor: fColor,
    });
    lbP.setMap(this.map);

    var visualArtsP = new google.maps.Polygon({
      paths: visualArts,
      fillColor: fColor,
    });
    visualArtsP.setMap(this.map);

    var greyNunsP = new google.maps.Polygon({
      paths: greyNuns,
      fillColor: fColor,
    });
    greyNunsP.setMap(this.map);

    var scienceComplexP = new google.maps.Polygon({
      paths: scienceComplex,
      fillColor: fColor,
    });
    scienceComplexP.setMap(this.map);

    var journalismP = new google.maps.Polygon({
      paths: journalismBuilding,
      fillColor: fColor,
    });
    journalismP.setMap(this.map);

    var chapelP = new google.maps.Polygon({
      paths: chapel,
      fillColor: fColor,
    });
    chapelP.setMap(this.map);

    var stingerDomeP = new google.maps.Polygon({
      paths: stingerDome,
      fillColor: fColor,
    });
    stingerDomeP.setMap(this.map);

    var stingerStadiumP = new google.maps.Polygon({
      paths: stingerStadium,
      fillColor: fColor,
    });
    stingerStadiumP.setMap(this.map);

    var centralBuildingP = new google.maps.Polygon({
      paths: centralBuilding,
      fillColor: fColor,
    });
    centralBuildingP.setMap(this.map);

    var vanierLibraryP = new google.maps.Polygon({
      paths: vanierLibrary,
      fillColor: fColor,
    });
    vanierLibraryP.setMap(this.map);

    var psyP = new google.maps.Polygon({
      paths: psyBuilding,
      fillColor: fColor,
    });
    psyP.setMap(this.map);

    var adminP = new google.maps.Polygon({
      paths: adminBuilding,
      fillColor: fColor,
    });
    adminP.setMap(this.map);

    var jesuitP = new google.maps.Polygon({
      paths: jesuitHall,
      fillColor: fColor,
    });
    jesuitP.setMap(this.map);

    var athleticCampP = new google.maps.Polygon({
      paths: athleticCamp,
      fillColor: fColor,
    });
    athleticCampP.setMap(this.map);

    var loyolaGymP = new google.maps.Polygon({
      paths: loyolaGym,
      fillColor: fColor,
    });
    loyolaGymP.setMap(this.map);

    var phyServiceP = new google.maps.Polygon({
      paths: phyServiceBuilding,
      fillColor: fColor,
    });
    phyServiceP.setMap(this.map);
  
    var centerArtsP = new google.maps.Polygon({
      paths: centerArts,
      fillColor: fColor,
    });
    centerArtsP.setMap(this.map);

    var saintIgnatiusP = new google.maps.Polygon({
      paths: saintIgnatius,
      fillColor: fColor,
    });
    saintIgnatiusP.setMap(this.map);

    var structuralCenterP = new google.maps.Polygon({
      paths: structuralCenter,
      fillColor: fColor,
    });
    structuralCenterP.setMap(this.map);

    var jesuitResidenceP = new google.maps.Polygon({
      paths: jesuitResidence,
      fillColor: fColor,
    });
    jesuitResidenceP.setMap(this.map);

    var studentResidencesP = new google.maps.Polygon({
      paths: studentResidences,
      fillColor: fColor,
    });
    studentResidencesP.setMap(this.map);

    //Text properties for all buildings
    var markerColor = 'purple';
    var fontWeight = 'bold';
    var fontSize = '16px';
    var iconEmpty = '../res/img/empty.png';

    //Hall Building Marker and info window
    var hallMarker = new google.maps.Marker
    ({
      position: {lat: 45.497092, lng: -73.578974},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'HALL',
          fontSize: fontSize,
      },
    });

    hallMarker.setMap(this.map);

    var hallInfo = new google.maps.InfoWindow({content:""});

    var hallContent =
    "<ion-list> <h4 align='center'>Henry F. Hall Building </h4>" +
    "<ion-item><ion-text> <label ><b>Address:</b></label> 1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8 </ion-text> </ion-item>"+
    "<ion-item><label style='margin-right:1.2em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Geography, Planning and Environment</option>"+
    "<option value=''>Political Science, Sociology and Anthropology, Economics</option>"+
    "<option value=''>School of Irish Studies</option>" +
    "</select></ion-item>"+
    
    "<ion-item><label style='margin-right:3.2em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Welcome Crew Office</option>"+
    "<option value=''>DB Clarke Theatre</option>"+
    "<option value=''>Dean of Students</option>" +
    "<option value=''>Aboriginal Student Resource Centre</option>"+
    "<option value=''>Concordia Student Union</option>"+
    "<option value=''>IT Service Desk</option>"+
    "<option value=''>Security Office</option>" +
    "<option value=''>Student Success Centre</option>"+
    "<option value=''>Mail Services</option>"+
    "<option value=''>Archives</option>"+
    "<option value=''>Career and Planning Services</option>"+
    "<option value=''>Sexual Assault Ressource Centre (SARC)</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%' src=assets/BuildingImages/HallBuilding.jpg></div>" +
    "<div align ='center'><ion-button id='hall'>Enter Building</ion-button></div>"

    google.maps.event.addListener(hallMarker, 'click', function() 
    {
      hallInfo.setContent(hallContent);

      hallInfo.open(this.map, hallMarker);
    });

    hallInfo.addListener('domready', () => {
      document.getElementById("hall").addEventListener("click", () => {
        this.enterBuilding("hall");
      });
    });


    //EV Building Marker and info window
    var EVMarker = new google.maps.Marker
    ({
      position: {lat: 45.495470, lng: -73.577780},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'EV',
          fontSize: fontSize,
      },
    });

    EVMarker.setMap(this.map);
    
    var EVInfo = new google.maps.InfoWindow({content:""});

    var EVContent =
    "<ion-list><h4 align='center'>Engineering, Computer Science and Visual Arts Integrated Complex</h4>" +
      "<ion-item><ion-text><label><b>Address:</b> </label>1515 Saint-Catherine St W, Montreal, Quebec H3G 2W1</ion-text> </ion-item>"+
      "<ion-item><label style='margin-right:1.2em'><b>Departments: </b></label> <select style='width:32%;'>" +
      "<option value=''>View</option>"+
      "<option value=''>Gina Cody School of Engineering and Computer Science</option>"+
      "<option value=''>Electrical and Computer Engineering</option>"+
      "<option value=''>Building, Civil and Environmental Engineering</option>" +
      "<option value=''>Computer Science and Software Engineering</option>"+
      "<option value=''>Mechanical, Industrial and Aerospace Engineering</option>"+
      "<option value=''>Design and Computation Arts</option>"+
      "<option value=''>Faculty of Fine Arts</option>"+
      "<option value=''>Recreation and Athletics</option>"+
      "<option value=''>Zero Energy Building Studies</option>"+
      "<option value=''>Centre for Pattern Recognition and Machine Intelligence</option>"+
      "<option value=''>Center for Composites</option>"+
      "</select></ion-item>"+
      
      "<ion-item><label style='margin-right:3.2em'><b>Services: </b></label> <select style='width:32%;'>" +
      "<option value=''>View</option>"+
      "<option value=''>LeGym</option>"+
      "<option value=''>FOFA Gallery</option>"+
      "</select></ion-item>"+
      "</ion-list>"+
      "<div align ='center'><img width='45%' src=assets/BuildingImages/ev.jpg></div>" +
      "<div align ='center'><ion-button id='ev'>Enter Building</ion-button></div>"

    google.maps.event.addListener(EVMarker, 'click', function() 
    {
      //Probably put this in html file
      EVInfo.setContent(EVContent);


      EVInfo.open(this.map, EVMarker);
    });

    EVInfo.addListener('domready', () => {
      document.getElementById("ev").addEventListener("click", () => {
        this.enterBuilding("ev");
      });
    });

          
    //LB Building Marker and info window
    var LBMarker = new google.maps.Marker
    ({
      position: {lat: 45.496708, lng: -73.577912},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'LB',
          fontSize: fontSize,
      },
    });

    LBMarker.setMap(this.map);

    var LBInfo = new google.maps.InfoWindow({content:""});

    var LBContent =
    "<ion-list> <h4 align='center'>J.W. McConnel Building</h4>" +
    "<ion-item><ion-text><label><b>Address:</b></label> 1400 Maisonneuve Blvd W Montreal, QC H3G 1M8 </ion-text></ion-item>"+
    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>English</option>"+
    "<option value=''>History</option>"+
    "<option value=''>Études françaises</option>" +
    "<option value=''>Mathematics and Statistics</option>"+
    "<option value=''>Education</option>"+
    "<option value=''>Centre for Interdisciplinary Studies in Society and Culture</option>" +
    "<option value=''>Centre for the Study of Learning and Performance</option>" +
    "</select></ion-item>"+
    
    "<ion-item><label style='margin-right:3.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>R. Howard Webster Library</option>"+
    "<option value=''>Welcome Centre</option>"+
    "<option value=''>Leonard and Bina Ellen Art Gallery</option>" +
    "<option value=''>J.A. De Sève Cinema</option>"+
    "<option value=''>Birks Student Service Centre</option>"+
    "<option value=''>Campus Stores</option>"+
    "<option value=''>Instructional & Information Technology Services (IITS)</option>" +
    "<option value=''>4TH SPACE</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='70%' src=assets/BuildingImages/LB.jpg><div>" +
    "<div align ='center'><ion-button id='lb' >Enter Building</ion-button></div>";

    google.maps.event.addListener(LBMarker, 'click', function() 
    {
      LBInfo.setContent(LBContent);

      LBInfo.open(this.map, LBMarker);
    });

    LBInfo.addListener('domready', () => {
      document.getElementById("lb").addEventListener("click", () => {
        this.enterBuilding("lb");
      });
    });

   
    var FGMarker = new google.maps.Marker
    ({
      position: {lat: 45.494115, lng: -73.578223},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'FG',
          fontSize: fontSize,
      },
    });

    FGMarker.setMap(this.map);

    var FGInfo = new google.maps.InfoWindow({content:""});

    var FGContent =
    "<ion-list> <h4 align='center'>Faubourg Building </h4>" +
    "<ion-item><ion-text><label><b>Address:</b></label>  1250 Guy St, Montreal, Quebec H3H 2L3</ion-text></ion-item>"+
    
    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Education</option>"+
    "<option value=''>Classics, Modern Language & Linguistics</option>"+
    "<option value=''>Concordia Continuing Education</option>" +
    "<option value=''>Mel Hoppenheim School of Cinema</option>" +
    "<option value=''>Montreal Institute for Genocide and Human Rights Studies</option>" +
    "<option value=''>District 3 Innovation Center</option>" +
    "</select></ion-item>"+
    
    "<ion-item><label style='margin-right:3.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Human Resources</option>"+
    "<option value=''>Office of the Registrar</option>"+
    "<option value=''>Examinations Office</option>"+
    "<option value=''>Senior non-credit program</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='60%' src=assets/BuildingImages/fb.jpg></div>" +
    "<div align ='center'><ion-button id='fg'>Enter Building</ion-button></div>";

    google.maps.event.addListener(FGMarker, 'click', function() 
    {
      FGInfo.setContent(FGContent);

      FGInfo.open(this.map, FGMarker);
    });

    FGInfo.addListener('domready', () => {
      document.getElementById("fg").addEventListener("click", () => {
        this.enterBuilding("fg");
      });
    });
    


    var MBMarker = new google.maps.Marker
    ({
      position: {lat: 45.495095, lng: -73.578854},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'MB',
          fontSize: fontSize,
      },
    });

    MBMarker.setMap(this.map);

    var MBInfo = new google.maps.InfoWindow({content:""});

    var MBContent =
    "<ion-list> <h4 align='center'>John Molson Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>1600 Boulevard de Maisonneuve O, Montréal, QC H3H 1J5</ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Accoutancy</option>"+
    "<option value=''>Supply Chain & Business Technology Management</option>"+
    "<option value=''>Finance</option>" +
    "<option value=''>Management</option>" +
    "<option value=''>Executive MBA Program</option>" +
    "<option value=''>Music</option>" +
    "<option value=''>Theatre</option>" +
    "<option value=''>Contemporary Dance</option>" +
    "</select></ion-item>"+
    
    "<ion-item><label style='margin-right:3.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Career Management Services</option>"+
    "<option value=''>John Molson Executive Centre</option>"+
    "<option value=''>Office of the Registrar</option>"+
    "<option value=''>Performing Arts Facilities</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%' src=assets/BuildingImages/JMSB.jpg></div>" +
    "<div align ='center'><ion-button id='fg'>Enter Building</ion-button></div>"

    google.maps.event.addListener(MBMarker, 'click', function() 
    {
      MBInfo.setContent(MBContent);

      MBInfo.open(this.map, MBMarker);
    });

    MBInfo.addListener('domready', () => {
      document.getElementById("mb").addEventListener("click", () => {
        this.enterBuilding("mb");
      });
    });  



    var VAMarker = new google.maps.Marker
    ({
      position: {lat: 45.495530, lng: -73.573845},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'VA',
          fontSize: fontSize,
      },
    });

    VAMarker.setMap(this.map);

    var VAInfo = new google.maps.InfoWindow({content:""});

    var VAContent =
    "<ion-list> <h4 align='center'>Visual Arts Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b>1395 René-Lévesque Blvd W, Montreal, Quebec H3G 2M5</label></ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;' >" +
    "<option value=''>View</option>"+
    "<option value=''>Studio Arts</option>"+
    "<option value=''>Art History</option>"+
    "<option value=''>Art Education</option>" +
    "<option value=''>Creative Arts Therapies</option>" +
    "</select></ion-item>"+
    
    "<ion-item><label style='margin-right:3.5em'><b>Services: </b></label> <select style='width:32%;' >" +
    "<option value=''>View</option>"+
    "<option value=''>VAV Art Gallery</option>"+
    "<option value=''>Art Supply Store</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='75%' src=assets/BuildingImages/va.jpg><div>" +
    "<div align ='center'><ion-button id='va'>Enter Building</ion-button></div>";


    google.maps.event.addListener(VAMarker, 'click', function() 
    {
      VAInfo.setContent(VAContent);

      VAInfo.open(this.map, VAMarker);
    });

    VAInfo.addListener('domready', () => {
      document.getElementById("va").addEventListener("click", () => {
        this.enterBuilding("va");
      });
    });  

  

    var GNMarker = new google.maps.Marker
    ({
      position: {lat: 45.493729, lng: -73.576222},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'GN',
          fontSize: fontSize,
      },
    });

    GNMarker.setMap(this.map);

    var GNInfo = new google.maps.InfoWindow({content:""});

    var GNContent =
    "<ion-list> <h4 align='center'>Grey Nuns Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></ion-label>1395 René-Lévesque Blvd W, Montreal, Quebec H3G 2M5</ion-text> </ion-item>"+
    
    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;' >" +
    "<option value=''>View</option>"+
    "<option value=''>Residences</option>"+
    "<option value=''>Grey Nuns Library</option>"+
    "<option value=''>Daycare Centre</option>"+
    "<option value=''>Summer Accommodation</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='55%' src=assets/BuildingImages/gn.jpg></div>" +
    "<div align ='center'><ion-button id='gn'>Enter Building</ion-button></p><div>";

    google.maps.event.addListener(GNMarker, 'click', function() 
    {
      GNInfo.setContent(GNContent);

      GNInfo.open(this.map, GNMarker);
    });

    GNInfo.addListener('domready', () => {
      document.getElementById("gn").addEventListener("click", () => {
        this.enterBuilding("gn");
      });
    });  

  
    //Loyola Campus
    var CJMarker = new google.maps.Marker
    ({
      position: {lat: 45.457395, lng: -73.640399},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CJ',
          fontSize: fontSize,
      },
    });

    CJMarker.setMap(this.map);

    var CJInfo = new google.maps.InfoWindow({content:""});

    var CJContent =
    "<ion-list> <h4 align='center'>Communication Studies and Journalism Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6 </ion-text></ion-item>"+
    
    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Communication Studies</option>"+
    "<option value=''>Journalism</option>"+
    "</select></ion-item>"+

    "<ion-item><label style='margin-right:3.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Campus Retail Stores</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='55%' src=assets/BuildingImages/cj.jpg><div>" +
    "<div align ='center'><ion-button id='cj'>Enter Building</ion-button></div>";

    google.maps.event.addListener(CJMarker, 'click', function() 
    {
      CJInfo.setContent(CJContent);

      CJInfo.open(this.map, CJMarker);
    });

    CJInfo.addListener('domready', () => {
      document.getElementById("cj").addEventListener("click", () => {
        this.enterBuilding("cj");
      });
    });  



    var SCMarker = new google.maps.Marker
    ({
      position: {lat: 45.457605, lng: -73.641512},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SC',
          fontSize: fontSize,
      },
    });

    SCMarker.setMap(this.map);

    var SCInfo = new google.maps.InfoWindow({content:""});

    var SCContent =
    "<ion-list><h4 align='center'>Richard J. Renaud Science Complex</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>3475 Rue West Broadway Montreal, QC H4B 2A7<ion-text></ion-item>"+
    
    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Biology</option>"+
    "<option value=''>Chemistry and Biochemistry</option>"+
    "<option value=''>Health, Kinesiology & Applied Physiology</option>"+
    "<option value=''>Physics</option>"+
    "<option value=''>Psychology</option>"+
    "<option value=''>Centre for Biological Applications of Mass Spectrometry</option>"+
    "<option value=''>Centre for NanoScience Research</option>"+
    "<option value=''>Centre for Studies in Behavioral Neurobiology</option>"+
    "<option value=''>Centre for Research in Molecular Modeling</option>"+
    "</select></ion-item>"+

    "<ion-item><label style='margin-right:3.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Science College</option>"+
    "<option value=''>Science Technical Centre</option>"+
    "<option value=''>Animal Care Facilities</option>"+
    "<option value=''>Security Office</option>"+
    "<option value=''>Café</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='60%'  src=assets/BuildingImages/sc.jpg></div>" +
    "<div align = 'center'><ion-button id='sc'>Enter Building</ion-button></div>";

    google.maps.event.addListener(SCMarker, 'click', function() 
    {
      SCInfo.setContent(SCContent);

      SCInfo.open(this.map, SCMarker);
    });

    SCInfo.addListener('domready', () => {
      document.getElementById("sc").addEventListener("click", () => {
        this.enterBuilding("sc");
      });
    });  

    var LJMarker = new google.maps.Marker
    ({
      position: {lat: 45.458514, lng: -73.641082},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'LJ',
          fontSize: fontSize,
      },
    });

    LJMarker.setMap(this.map);

    var LJInfo = new google.maps.InfoWindow({content:""});

    var LJContent =
    "<ion-list><h4 align='center'>Loyola Jesuit Hall and Conference Centre</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6<ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Loyola Jesuit Hall and Conference Centre</option>"+
    "<option value=''>Conference services</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%'  src=assets/BuildingImages/lj.jpg></div>" +
    "<div align = 'center'><ion-button id='lj'>Enter Building</ion-button></div>";

    google.maps.event.addListener(LJMarker, 'click', function() 
    {
      LJInfo.setContent(LJContent);

      LJInfo.open(this.map, LJMarker);
    });

    LJInfo.addListener('domready', () => {
      document.getElementById("lj").addEventListener("click", () => {
        this.enterBuilding("lj");
      });
    });  


    var CBMarker = new google.maps.Marker
    ({
      position: {lat: 45.458236, lng: -73.640345},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CB',
          fontSize: fontSize,
      },
    });

    CBMarker.setMap(this.map);

    var CBInfo = new google.maps.InfoWindow({content:""});

    var CBContent =
    "<ion-list><h4 align='center'>Central Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 2B5</ion-text></ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Concordia Student Union</option>"+
    "<option value=''>Loyola College for Diversity and Sustainability and Loyola</option>"+
    "</select></ion-item>"+
    "</ion-list>"+
    "<div align ='center'><img width='50%'  src=assets/BuildingImages/cb.jpg></div>" +
    "<div align = 'center'><ion-button id='cb'>Enter Building</ion-button></div>";

    google.maps.event.addListener(CBMarker, 'click', function() 
    {
      CBInfo.setContent(CBContent);

      CBInfo.open(this.map, CBMarker);
    });

    CBInfo.addListener('domready', () => {
      document.getElementById("cb").addEventListener("click", () => {
        this.enterBuilding("cb");
      });
    });  


    var ADMarker = new google.maps.Marker
    ({
      position: {lat: 45.458070, lng: -73.639732},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'AD',
          fontSize: fontSize,
      },
    });

    ADMarker.setMap(this.map);

    var ADInfo = new google.maps.InfoWindow({content:""});

    var ADContent =
    "<ion-list> <h4 align='center'>Administration Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-text> </ion-item>"+
    
    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Faculty of Arts & Science</option>"+
    "</select></ion-item>"+

    "<ion-item><label style='margin-right:3.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Welcome Crew Office</option>"+
    "<option value=''>Centre for Teaching & Learning</option>"+
    "<option value=''>Loyola International College</option>"+
    "<option value=''>Provost and VP, Academic</option>"+
    "<option value=''>Concordia Multi-Faith and Spirituality Centre</option>"+
    "<option value=''>Advocacy & Support Services</option>"+
    "<option value=''>Access Centre for Students with Disabilities</option>"+
    "<option value=''>Councelling and Development</option>"+
    "<option value=''>Health Services</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='55%' src=assets/BuildingImages/ad.jpg><div>" +
    "<div align ='center'><ion-button id='ad'>Enter Building</ion-button></div>";

    google.maps.event.addListener(ADMarker, 'click', function() 
    {
      ADInfo.setContent(ADContent);

      ADInfo.open(this.map, ADMarker);
    });

    ADInfo.addListener('domready', () => {
      document.getElementById("ad").addEventListener("click", () => {
        this.enterBuilding("ad");
      });
    });  


    
    var PYMarker = new google.maps.Marker
    ({
      position: {lat: 45.458894, lng: -73.640568},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'PY',
          fontSize: fontSize,
      },
    });

    PYMarker.setMap(this.map);

    var PYInfo = new google.maps.InfoWindow({content:""});

    var PYContent =
    "<ion-list> <h4 align='center'>Psychology Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 2Z3</ion-text> </ion-item>"+
    
    "<ion-item><label style='margin-right:1.5em'><b>Departments: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Psychology</option>"+
    "<option value=''>Centre for clinical research in health (CCRH)</option>"+
    "</select></ion-item></ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/py.jpg><div>" +
    "<div align ='center'><ion-button id='py'>Enter Building</ion-button></div>";

    google.maps.event.addListener(PYMarker, 'click', function() 
    {
      PYInfo.setContent(PYContent);

      PYInfo.open(this.map, PYMarker);
    });

    PYInfo.addListener('domready', () => {
      document.getElementById("py").addEventListener("click", () => {
        this.enterBuilding("py");
      });
    });  


       
    var VLMarker = new google.maps.Marker
    ({
      position: {lat: 45.458932, lng: -73.638512},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'VL',
          fontSize: fontSize,
      },
    });

    VLMarker.setMap(this.map);

    var VLInfo = new google.maps.InfoWindow({content:""});

    var VLContent =
    "<ion-list><h4 align='center'>Vanier Library</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Library</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/vl.jpg><div>" +
    "<div align ='center'><ion-button id='vl'>Enter Building</ion-button></div>";

    google.maps.event.addListener(VLMarker, 'click', function() 
    {
      VLInfo.setContent(VLContent);

      VLInfo.open(this.map, VLMarker);
    });

    VLInfo.addListener('domready', () => {
      document.getElementById("vl").addEventListener("click", () => {
        this.enterBuilding("vl");
      });
    });  


           
    var CSMarker = new google.maps.Marker
    ({
      position: {lat: 45.458008, lng: -73.637248 },
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CS',
          fontSize: fontSize,
      },
    });

    CSMarker.setMap(this.map);

    var CSInfo = new google.maps.InfoWindow({content:""});

    var CSContent =
    "<ion-list> <h4 align='center'>Concordia Stadium</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W Montreal, Quebec H4B 1R2</ion-text> </ion-item></ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/cs.jpg><div>"

    google.maps.event.addListener(CSMarker, 'click', function() 
    {
      CSInfo.setContent(CSContent);

      CSInfo.open(this.map, CSMarker);
    });

             
    var SDMarker = new google.maps.Marker
    ({
      position: {lat:45.457525, lng: -73.636085 },
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SD',
          fontSize: fontSize,
      },
    });

    SDMarker.setMap(this.map);

    var SDInfo = new google.maps.InfoWindow({content:""});

    var SDContent =
    "<ion-list> <h4 align='center'>Stinger Dome</ion-title></h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7200 Sherbrooke St W Montreal, Quebec H4B 1R2</ion-text></ion-item></ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/sd.jpg><div>"

    google.maps.event.addListener(SDMarker, 'click', function() 
    {
      SDInfo.setContent(SDContent);

      SDInfo.open(this.map, SDMarker);
    });

    
    var PCMarker = new google.maps.Marker
    ({
      position: {lat: 45.456701, lng: -73.637558},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'PC',
          fontSize: fontSize,
      },
    });

    PCMarker.setMap(this.map);

    var PCInfo = new google.maps.InfoWindow({content:""});

    var PCContent =
    "<ion-list><h4 align='center'>PERFORM Centre</ion-title></h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>PERFORM Centre</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='55%' src=assets/BuildingImages/pc.jpg><div>"

    google.maps.event.addListener(PCMarker, 'click', function() 
    {
      PCInfo.setContent(PCContent);

      PCInfo.open(this.map, PCMarker);
    });



    var CGMarker = new google.maps.Marker
    ({
      position: {lat:45.456910, lng: -73.638250},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'CG',
          fontSize: fontSize,
      },
    });

    CGMarker.setMap(this.map);

    var CGInfo = new google.maps.InfoWindow({content:""});

    var CGContent =
    "<ion-list> <h4 align='center'>Concordia Gymnasium</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7200 Sherbrooke St W Montreal, Quebec H4B 1R6 </ion-text></ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Gymnasium</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='55%' src=assets/BuildingImages/cg.jpg><div>"

    google.maps.event.addListener(CGMarker, 'click', function() 
    {
      CGInfo.setContent(CGContent);

      CGInfo.open(this.map, CGMarker);
    });


    var PSMarker = new google.maps.Marker
    ({
      position: {lat: 45.459523, lng: -73.639727},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'PS',
          fontSize: fontSize,
      },
    });

    PSMarker.setMap(this.map);

    var PSInfo = new google.maps.InfoWindow({content:""});

    var PSContent =
    "<ion-list> <h4 align='center'>Physical Services Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6 </ion-text></ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Environmental Health and Safety</option>"+
    "<option value=''>Facilities Management</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><ion-button id='vl'>Enter Building</ion-button></div>";

    google.maps.event.addListener(PSMarker, 'click', function() 
    {
      PSInfo.setContent(PSContent);

      PSInfo.open(this.map, PSMarker);
    });

    PSInfo.addListener('domready', () => {
      document.getElementById("ps").addEventListener("click", () => {
        this.enterBuilding("ps");
      });
    });  
    
    
    var TBMarker = new google.maps.Marker
    ({
      position: {lat:45.459969, lng: -73.640887},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'TB',
          fontSize: fontSize,
      },
    });

    TBMarker.setMap(this.map);

    var TBInfo = new google.maps.InfoWindow({content:""});

    var TBContent =
    "<ion-list><h4 align='center'>Terrebonne Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7079 Rue de Terrebonne, Montréal, QC H4B 2B4 </ion-text></ion-item> </ion-list>"

    google.maps.event.addListener(TBMarker, 'click', function() 
    {
      TBInfo.setContent(TBContent);

      TBInfo.open(this.map, TBMarker);
    });


    var SIMarker = new google.maps.Marker
    ({
      position: {lat:45.457724, lng: -73.642326},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SI',
          fontSize: fontSize,
      },
    });

    SIMarker.setMap(this.map);

    var SIInfo = new google.maps.InfoWindow({content:""});

    var SIContent =
    "<ion-list><h4 align='center'>Saint Ignatius of Loyola</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>4455 Rue West Broadway, Montréal, QC H4B 2A7</ion-text> </ion-item></ion-list>" +
    "<div align ='center'><img width='55%' src=assets/BuildingImages/si.png><div>"

    google.maps.event.addListener(SIMarker, 'click', function() 
    {
      SIInfo.setContent(SIContent);

      SIInfo.open(this.map, SIMarker);
    });


    var GEMarker = new google.maps.Marker
    ({
      position: {lat: 45.456857, lng: -73.640421},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'GE',
          fontSize: fontSize,
      },
    });

    GEMarker.setMap(this.map);

    var GEInfo = new google.maps.InfoWindow({content:""});

    var GEContent =
    "<ion-list><h4 align='center'>Centre for Structural and Functional Genomics</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Centre for Structural and Functional Genomics</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/ge.jpg><div>" +
    "<div align ='center'><ion-button id='ge'>Enter Building</ion-button></div>";

    google.maps.event.addListener(GEMarker, 'click', function() 
    {
      GEInfo.setContent(GEContent);

      GEInfo.open(this.map, GEMarker);
    });

    GEInfo.addListener('domready', () => {
      document.getElementById("ge").addEventListener("click", () => {
        this.enterBuilding("ge");
      });
    });  

    
    var JRMarker = new google.maps.Marker
    ({
      position: {lat: 45.458454, lng: -73.643229},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'JR',
          fontSize: fontSize,
      },
    });

    JRMarker.setMap(this.map);

    var JRInfo = new google.maps.InfoWindow({content:""});

    var JRContent =
    "<ion-list><h4 align='center'>Jesuit Residence</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec</ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Student Residence</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/jr.jpg><div>" 

    google.maps.event.addListener(JRMarker, 'click', function() 
    {
      JRInfo.setContent(JRContent);

      JRInfo.open(this.map, JRMarker);
    });



    var SRMarker = new google.maps.Marker
    ({
      position: {lat: 45.459204, lng: -73.641761},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'SR',
          fontSize: fontSize,
      },
    });

    SRMarker.setMap(this.map);

    var SRInfo = new google.maps.InfoWindow({content:""});

    var SRContent =
    "<ion-list><h4 align='center'>Student Residence</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7079 Rue de Terrebonne, Montréal, QC H4B 2B4</ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>Student Residence</option>"+
    "</select></ion-item>"+
    "</ion-list>"

    google.maps.event.addListener(SRMarker, 'click', function() 
    {
      SRInfo.setContent(SRContent);

      SRInfo.open(this.map, SRMarker);
    });

    
    var FCMarker = new google.maps.Marker
    ({
      position: {lat: 45.458460, lng: -73.639219},
      map: this.map,
      icon: iconEmpty,
      label: 
      {
          color: markerColor,
          fontWeight: fontWeight,
          text: 'FC',
          fontSize: fontSize,
      },
    });

    FCMarker.setMap(this.map);

    var FCInfo = new google.maps.InfoWindow({content:""});

    var FCContent =
    "<ion-list><h4 align='center'>F.C. Smith Building</h4>" +
    "<ion-item><ion-text><label><b>Address: </b></label>7141 Sherbrooke St W, Montreal, Quebec H4B 1R6</ion-text> </ion-item>"+

    "<ion-item><label style='margin-right:1.5em'><b>Services: </b></label> <select style='width:32%;'>" +
    "<option value=''>View</option>"+
    "<option value=''>F.C. Smith Auditorium</option>"+
    "<option value=''>Cazalet Theater</option>"+
    "<option value=''>Concordia Multi-Faith and Spirituality Centre</option>"+
    "</select></ion-item>"+
    "</ion-list>"+

    "<div align ='center'><img width='45%' src=assets/BuildingImages/fc.jpeg><div>" 
    "<div align ='center'><ion-button id='fc'>Enter Building</ion-button></div>";

    google.maps.event.addListener(FCMarker, 'click', function() 
    {
      FCInfo.setContent(FCContent);

      FCInfo.open(this.map, FCMarker);
    });

    FCInfo.addListener('domready', () => {
      document.getElementById("fc").addEventListener("click", () => {
        this.enterBuilding("fc");
      });
    });  

   
    //var hallTest = new google.maps.LatLng(45.497194, -73.578886) //Variable to test containsLocation
    
     //For current location
    var currentLoc = this.getCurrentLocation();
    var currentBuilding = ""; //For Content of user marker info window
    var currentCampus = "";

    //Listener to the user location marker
    userLocationMarker.addListener('click', function()
    {
      //let userLocation = this.getCurrentLocation();
      //Check if user location is inside a Concordia campus
      if(google.maps.geometry.poly.containsLocation(currentLoc, sjwP) == true)
      {
        currentCampus = "Sir George Williams Campus";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, loyolaP) == true))
      {
        currentCampus = "Loyola Campus";
      }
      else
      {
        currentCampus = "N/A";
      }    


      //Check if user location is inside a Concordia building
      if(google.maps.geometry.poly.containsLocation(currentLoc, hallP) == true)
      {
        currentBuilding = "Hall Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, molsonP) == true))
      {
        currentBuilding = "John Molson Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, EVP) == true))
      {
        currentBuilding = "Engineering, Computer Science and Visual Arts Integrated Complex";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, lbP) == true))
      {
        currentBuilding = "J.W. McConnel Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, visualArtsP) == true))
      {
        currentBuilding = "Visual Arts Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, faubourgP) == true))
      {
        currentBuilding = "Faubourg Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, greyNunsP) == true))
      {
        currentBuilding = "Grey Nuns Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, journalismP) == true))
      {
        currentBuilding = "Communication Studies and Journalism Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, scienceComplexP) == true))
      {
        currentBuilding = "Richard J. Renaud Science Complex";
      }
      
      else if((google.maps.geometry.poly.containsLocation(currentLoc, jesuitP) == true))
      {
        currentBuilding = "Loyola Jesuit Hall and Conference Centre";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, centralBuildingP) == true))
      {
        currentBuilding = "Central Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, adminP) == true))
      {
        currentBuilding = "Administration Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, psyP) == true))
      {
        currentBuilding = "Psychology Building";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, vanierLibraryP) == true))
      {
        currentBuilding = "Vanier Library";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, stingerStadiumP) == true))
      {
        currentBuilding = "Concordia Stadium";
      }

      else if((google.maps.geometry.poly.containsLocation(currentLoc, stingerDomeP) == true))
      {
        currentBuilding = "Stinger Dome";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, athleticCampP) == true))
      {
        currentBuilding = "PERFORM Centre";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, loyolaGymP) == true))
      {
        currentBuilding = "Concordia Gymnasium";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, phyServiceP) == true))
      {
        currentBuilding = "Physical Services Building<";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, centerArtsP) == true))
      {
        currentBuilding = "Terrebonne Building";
      }
      
      else if((google.maps.geometry.poly.containsLocation(currentLoc, saintIgnatiusP) == true))
      {
        currentBuilding = "Saint Ignatius of Loyola";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, structuralCenterP) == true))
      {
        currentBuilding = "Centre for Structural and Functional Genomics";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, jesuitResidenceP) == true))
      {
        currentBuilding = "Jesuit Residence";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, studentResidencesP) == true))
      {
        currentBuilding = "Student Residence";
      }
      else if((google.maps.geometry.poly.containsLocation(currentLoc, chapelP) == true))
      {
        currentBuilding = "F.C. Smith Building<";
      }
      else
      {
        currentBuilding = "N/A";
      }          

      userContent =
          "<ion-list><h4 align='center'>Concordia University</h4>" +
          "<ion-item><ion-text><label><b>Current Campus: </b></label>"+currentCampus+"</ion-text></ion-item>"+
          "<ion-item><ion-text><label><b>Current Building: </b></label>"+currentBuilding+"</ion-text></ion-item></ion-list>"
      userInfoWindow.setContent(userContent);
      userInfoWindow.open(this.map, userLocationMarker);
    });
  }

  
  // FUNCTION USED AFTER USER CLICKS THE "Enter Building" button
  // Prototype for now
  async enterBuilding(id: string)
  {
    switch (id) 
    {
      //Hall Building
      case 'hall':
          console.log("In " + id + " building.");
          break;
      //EV building
      case 'ev':
          console.log("In " + id + " building.");
          break;
      //Library Building
      case 'lb':
          console.log("In " + id + " building.");
          break;
      //Faubourg Building
      case 'fg':
          console.log("In " + id + " building.");
          break;
      //John Molson Building
      case 'mb':
          console.log("In " + id + " building.");
          break;
      //Visual Arts Building
      case 'va':
          console.log("In " + id + " building.");
          break;
      //Grey Nuns Building
      case 'gn':
          console.log("In " + id + " building.");
          break;
      //Communications & Journalism Building
      case 'cj':
          console.log("In " + id + " building.");
          break;
      //Renaud Science Complex
      case 'sc':
          console.log("In " + id + " building.");
          break;
      //Loyola Jesuit Hall and Conference Centre
      case 'lj':
          console.log("In " + id + " building.");
          break;
      //Central Building
      case 'cb':
          console.log("In " + id + " building.");
          break;
      //Administration Building
      case 'ad':
          console.log("In " + id + " building.");
          break;
      //Psychology Building
      case 'py':
          console.log("In " + id + " building.");
          break;
      //F.C. Smith Building/Loyola Chapel
      case 'fc':
        console.log("In " + id + " building.");
          break;
      //Vanier Library Building
      case 'vl':
          console.log("In " + id + " building.");
          break;
      //Physical Services Building
      case 'ps':
          console.log("In " + id + " building.");
          break;
      //Centre for Structural and Functional Genomics
      case 'ge':
        console.log("In " + id + " building.");
        break;
    }  

  }


}
