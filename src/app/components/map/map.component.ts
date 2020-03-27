import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReadGridService } from '../../services/readGrid/read-grid.service';
import { Location } from '../../models/Location';
import { Floor } from '../../models/Floor';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';
import { Campus } from '../../models/Campus';
import { empty } from 'rxjs';
import { isTabSwitch } from '@ionic/angular/dist/directives/navigation/stack-utils';
import { overlays } from './BuildingOverlayPoints';
import { Variable, Content } from '@angular/compiler/src/render3/r3_ast';
import { Building } from '../../models/Building';
import {IndoorPOI} from '../../models/IndoorPOI';
import {User} from '../../models/User';
import { MapService } from '../../services/map/map.service';

declare var google;

var componentContext = null;
var indoorModeEnable; 
var exitIndoorModeFunc;



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
  private poiMarkers = []; // google.maps.Marker[]
  private infoWindow;
  private buildingMarkers = [];
  private indoorOverlay;

  private sgw: Campus;
  private loyola: Campus;

 

//vars for drawing
private onMapMarkers : any;
private onMapPolygons: any;

//The following variables are used for indoor mode

//variables for indoor mode 
private currentActiveFloorInBuilding: number;
public currentActiveRoute: any;

//dictionary used to hold route for each floor need for journey
private indoorTransitionDirections: any; 

  //Color for polygons
  private fColor = "deepskyblue";

  //Text properties for all markers
  private markerColor = 'black';
  private fontWeight = 'bold';
  private fontSize = '21px';
  private iconEmpty = ''//'../res/img/empty.png';

  private firstTime: boolean; //Checks for the first time a ground overlay (indoorOverlay) is created for a building

  // Injects the component class with imported services
 constructor(private geolocation: Geolocation, 
              private mapService: MapService, 
              private buildingFactory: BuildingFactoryService) 
  {
    this.loyola = new Campus(new Location(45.458234, -73.640493, 0));
    this.sgw = new Campus(new Location(45.494711, -73.577871, 0));

    this.user = new User();
    componentContext = this;
    this.onMapMarkers = {};
    this.onMapPolygons = {};
    indoorModeEnable = false; 
    exitIndoorModeFunc = null;
    this.currentActiveFloorInBuilding = 0;
    this.currentActiveRoute = {};
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  // Initializes the map object with default values
  async initMap() {
    // Gets current position of user
    const resp: any = await this.geolocation.getCurrentPosition({timeout: 30000, enableHighAccuracy: true}).catch((error) => {
      console.log('Error getting location', error);
    });

    let centerMapCoordinate;

    //Check if user's current location has been retrieved
    if(resp){
      this.user.setLocation(new Location(resp.coords.latitude, resp.coords.longitude, 0));
      centerMapCoordinate = this.user.getLocation().getGoogleLatLng();
    }else{
      //If user does not allow access to their current location, set their location to a default value and center map on SGW campus
      this.user.setLocation(new Location(0,0,0));
      centerMapCoordinate = new google.maps.LatLng(45.494711, -73.577871);
    }

    this.mapOptions = {
      center: centerMapCoordinate,
      zoom: 17,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.googleMap.nativeElement, this.mapOptions);

    if (resp) {
      this.userMarker = new google.maps.Marker({
        position: this.user.getLocation().getGoogleLatLng(),
        map: this.map,
        title: 'Here'
      });
    }
    this.infoWindow = new google.maps.InfoWindow(); //Create infoWindow
    this.indoorOverlay = new google.maps.GroundOverlay(); 
    this.initOverlays();
    this.setDirectionsMap();
  }


  // sets an instance of the map to a service which injects it to other components
  setDirectionsMap() {
    this.mapService.setMap(this.map);
    this.mapService.setActiveMapComponent(this);
  }


  // Gets the current location of user and focuses map to that point
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.setLocation(new Location(resp.coords.latitude, resp.coords.longitude, 0));
      this.infoWindow.close(); //Close infoWindow
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
    this.infoWindow.close(); //Close infoWindow
  }
 
  // Spawns the building overlays on top of the map
  initOverlays()
  {
    const self = this;
    let userContent = "";

    // Declare all overlay points
    let visualArts = overlays.visualArts.overlayPoints;
    let sjwCampus = overlays.sjwCampus.overlayPoints
    let loyolaCampus = overlays.loyolaCampus.overlayPoints;
    let hall = overlays.hall.overlayPoints;
    let molson = overlays.molson.overlayPoints;
    let faubourg = overlays.faubourg.overlayPoints;
    let EV = overlays.EV.overlayPoints;
    let LB = overlays.LB.overlayPoints;
    let greyNuns = overlays.greyNuns.overlayPoints;
    let scienceComplex = overlays.scienceComplex.overlayPoints;
    let journalismBuilding = overlays.journalismBuilding.overlayPoints;
    let chapel = overlays.chapel.overlayPoints;
    let psyBuilding = overlays.psyBuilding.overlayPoints;
    let stingerDome = overlays.stingerDome.overlayPoints;
    let stingerStadium = overlays.stingerStadium.overlayPoints;
    let centralBuilding = overlays.centralBuilding.overlayPoints;
    let vanierLibrary = overlays.vanierLibrary.overlayPoints;
    let adminBuilding = overlays.adminBuilding.overlayPoints;
    let jesuitHall = overlays.jesuitHall.overlayPoints;
    let athleticCamp = overlays.athleticCamp.overlayPoints;
    let loyolaGym = overlays.loyolaGym.overlayPoints;
    let phyServiceBuilding = overlays.phyServiceBuilding.overlayPoints;
    let centerArts = overlays.centerArts.overlayPoints;
    let saintIgnatius = overlays.saintIgnatius.overlayPoints;
    let structuralCenter = overlays.structuralCenter.overlayPoints;
    let jesuitResidence = overlays.jesuitResidence.overlayPoints;
    let studentResidences = overlays.studentResidences.overlayPoints;
    let sjwPath = [visualArts, sjwCampus];

    //Type of polygon
    let campusType = "campus";
    let buildingType = "building";

    // Polygon for each campus
    let sjwP = this.createPolygon(sjwPath, campusType);
    let loyolaP = this.createPolygon(loyolaCampus, campusType);

    //Polygon for each building
    let hallP = this.createPolygon(hall, buildingType);
    this.onMapPolygons["HB"] = hallP;
    let molsonP = this.createPolygon(molson, buildingType);
    let faubourgP = this.createPolygon(faubourg, buildingType);
    let EVP = this.createPolygon(EV, buildingType);
    let lbP = this.createPolygon(LB, buildingType);
    let visualArtsP = this.createPolygon(visualArts, buildingType);
    let greyNunsP = this.createPolygon(greyNuns, buildingType);
    let scienceComplexP = this.createPolygon(scienceComplex, buildingType);
    let journalismP = this.createPolygon(journalismBuilding, buildingType);
    let chapelP = this.createPolygon(chapel, buildingType);
    let stingerDomeP = this.createPolygon(stingerDome, buildingType);
    let stingerStadiumP = this.createPolygon(stingerStadium, buildingType);
    let centralBuildingP = this.createPolygon(centralBuilding, buildingType);
    let vanierLibraryP = this.createPolygon(vanierLibrary, buildingType);
    let psyP = this.createPolygon(psyBuilding, buildingType);
    let adminP = this.createPolygon(adminBuilding, buildingType);
    let jesuitP = this.createPolygon(jesuitHall, buildingType);
    let athleticCampP = this.createPolygon(athleticCamp, buildingType);
    let loyolaGymP = this.createPolygon(loyolaGym, buildingType);
    let phyServiceP = this.createPolygon(phyServiceBuilding, buildingType);
    let centerArtsP = this.createPolygon(centerArts, buildingType);
    let saintIgnatiusP = this.createPolygon(saintIgnatius, buildingType);
    let structuralCenterP = this.createPolygon(structuralCenter, buildingType);
    let jesuitResidenceP = this.createPolygon(jesuitResidence, buildingType);
    let studentResidencesP = this.createPolygon(studentResidences, buildingType);

    //Building IDs (Building json file names)
    let hallID = "HB";
    let evID = "ev";
    let lbID = "LB";
    let fgID = "Faubourg";
    let mbID = "MB";
    let vaID = "VisualArts";
    let gnID = "GreyNuns";
    let cjID = "JournalismBuilding";
    let scID = "ScienceComplex";
    let ljID = "JesuitHall";
    let cbID = "CentralBuilding";
    let adID = "AdministrationBuilding";
    let pyID = "PsychologyBuilding";
    let vlID = "VanierLibrary";
    let csID = "ConcordiaStadium";
    let sdID = "StingerDome";
    let pcID = "PerformCentre";
    let cgID = "ConcordiaGymnasium";
    let psID = "PhysicalService";
    let tbID = "TerrebonneBuilding";
    let siID = "SaintIgnatius";
    let geID = "StructuralCenter";
    let jrID = "JesuitResidence";
    let srID = "StudentResidence";
    let fcID = "SmithBuilding";

    //Hall Building Marker and info window
    let hallCenter = {lat: 45.497092, lng: -73.578974};
    let hallMarker = this.createMarker(hallCenter, "HALL")
    this.onMapMarkers["HB"] = hallMarker;
    this.createinfoWindow(hallMarker, hallID);

    hallMarker.setText

    //EV Building Marker and info window
    let evCenter = {lat: 45.495470, lng: -73.577780};
    let EVMarker = this.createMarker(evCenter, "EV")
    this.createinfoWindow(EVMarker, evID);
    
    //LB Building Marker and info window
    let lbCenter = {lat: 45.496708, lng: -73.577912};
    let LBMarker = this.createMarker(lbCenter, "LB")
    this.createinfoWindow(LBMarker, lbID);

    let fgCenter = {lat: 45.494115, lng: -73.578223};
    let FGMarker = this.createMarker(fgCenter, "FG")
    this.createinfoWindow(FGMarker, fgID);

    let mbCenter = {lat: 45.495095, lng: -73.578854};
    let MBMarker = this.createMarker(mbCenter, "MB")
    this.createinfoWindow(MBMarker, mbID);

    let vaCenter = {lat: 45.495530, lng: -73.573845};
    let VAMarker = this.createMarker(vaCenter, "VA")
    this.createinfoWindow(VAMarker, vaID);

    let gnCenter = {lat: 45.493432, lng: -73.576705};
    let GNMarker = this.createMarker(gnCenter, "GN")
    this.createinfoWindow(GNMarker, gnID);
  
    //Loyola Campus
    let cjCenter = {lat: 45.457395, lng: -73.640399};
    let CJMarker = this.createMarker(cjCenter, "CJ")
    this.createinfoWindow(CJMarker, cjID);

    let scCenter = {lat: 45.457605, lng: -73.641512};
    let SCMarker = this.createMarker(scCenter, "SC");
    this.createinfoWindow(SCMarker, scID);

    let ljCenter = {lat: 45.458514, lng: -73.641082};
    let LJMarker = this.createMarker(ljCenter, "LJ");
    this.createinfoWindow(LJMarker, ljID);

    let cbCenter = {lat: 45.458236, lng: -73.640345};
    let CBMarker = this.createMarker(cbCenter, "CB");
    this.createinfoWindow(CBMarker, cbID);

    let adCenter = {lat: 45.458070, lng: -73.639732};
    let ADMarker = this.createMarker(adCenter, "AD");
    this.createinfoWindow(ADMarker, adID);

    let pyCenter = {lat: 45.458894, lng: -73.640568};
    let PYMarker = this.createMarker(pyCenter, "PY");
    this.createinfoWindow(PYMarker, pyID);

    let vlCenter = {lat: 45.458932, lng: -73.638512};
    let VLMarker = this.createMarker(vlCenter, "VL");
    this.createinfoWindow(VLMarker, vlID);

    let csCenter = {lat: 45.458008, lng: -73.637248};
    let CSMarker = this.createMarker(csCenter, "CS");
    this.createinfoWindow(CSMarker, csID);
             
    let sdCenter = {lat: 45.457525, lng: -73.636085};
    let SDMarker = this.createMarker(sdCenter, "SD");
    this.createinfoWindow(SDMarker, sdID);
    
    let pcCenter = {lat: 45.456701, lng: -73.637558};
    let PCMarker = this.createMarker(pcCenter, "PC");
    this.createinfoWindow(PCMarker, pcID);

    let cgCenter = {lat: 45.456910, lng: -73.638250};
    let CGMarker = this.createMarker(cgCenter, "CG");
    this.createinfoWindow(CGMarker, cgID);

    let psCenter = {lat: 45.459523, lng: -73.639727};
    let PSMarker = this.createMarker(psCenter, "PS");
    this.createinfoWindow(PSMarker, psID);

    let tbCenter = {lat:45.459969, lng: -73.640887};
    let TBMarker = this.createMarker(tbCenter, "TB");
    this.createinfoWindow(TBMarker, tbID);

    let siCenter = {lat:45.457724, lng: -73.642326};
    let SIMarker = this.createMarker(siCenter, "SI");
    this.createinfoWindow(SIMarker, siID);

    let geCenter = {lat: 45.456857, lng: -73.640421};
    let GEMarker = this.createMarker(geCenter, "GE");
    this.createinfoWindow(GEMarker, geID);

    let jrCenter = {lat: 45.458454, lng: -73.643229};
    let JRMarker = this.createMarker(jrCenter, "JR");
    this.createinfoWindow(JRMarker, jrID);

    let srCenter = {lat: 45.459204, lng: -73.641761};
    let SRMarker = this.createMarker(srCenter, "SR");
    this.createinfoWindow(SRMarker, srID);
    
    let fcCenter = {lat: 45.458460, lng: -73.639219};
    let FCMarker = this.createMarker(fcCenter, "FC");
    this.createinfoWindow(FCMarker, fcID);

    // let hallTest = new google.maps.LatLng(45.497194, -73.578886) //variable to test containsLocation
    // For current location
    let currentLoc = this.getCurrentLocation();
    let currentBuilding = ''; // For Content of user marker info window
    let currentCampus = '';

    // Listener to the user location marker
    self.userMarker.addListener('click', function() {
      // Check if user location is inside a Concordia campus
      if (google.maps.geometry.poly.containsLocation(currentLoc, sjwP) == true) {
        currentCampus = 'Sir George Williams Campus';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, loyolaP) == true)) {
        currentCampus = 'Loyola Campus';
      } else {
        currentCampus = 'N/A';
      }

      // Check if user location is inside a Concordia building
      if (google.maps.geometry.poly.containsLocation(currentLoc, hallP) == true) {
        currentBuilding = 'Hall Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, molsonP) == true)) {
        currentBuilding = 'John Molson Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, EVP) == true)) {
        currentBuilding = 'Engineering, Computer Science and Visual Arts Integrated Complex';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, lbP) == true)) {
        currentBuilding = 'J.W. McConnel Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, visualArtsP) == true)) {
        currentBuilding = 'Visual Arts Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, faubourgP) == true)) {
        currentBuilding = 'Faubourg Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, greyNunsP) == true)) {
        currentBuilding = 'Grey Nuns Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, journalismP) == true)) {
        currentBuilding = 'Communication Studies and Journalism Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, scienceComplexP) == true)) {
        currentBuilding = 'Richard J. Renaud Science Complex';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, jesuitP) == true)) {
        currentBuilding = 'Loyola Jesuit Hall and Conference Centre';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, centralBuildingP) == true)) {
        currentBuilding = 'Central Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, adminP) == true)) {
        currentBuilding = 'Administration Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, psyP) == true)) {
        currentBuilding = 'Psychology Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, vanierLibraryP) == true)) {
        currentBuilding = 'Vanier Library';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, stingerStadiumP) == true)) {
        currentBuilding = 'Concordia Stadium';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, stingerDomeP) == true)) {
        currentBuilding = 'Stinger Dome';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, athleticCampP) == true)) {
        currentBuilding = 'PERFORM Centre';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, loyolaGymP) == true)) {
        currentBuilding = 'Concordia Gymnasium';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, phyServiceP) == true)) {
        currentBuilding = 'Physical Services Building<';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, centerArtsP) == true)) {
        currentBuilding = 'Terrebonne Building';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, saintIgnatiusP) == true)) {
        currentBuilding = 'Saint Ignatius of Loyola';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, structuralCenterP) == true)) {
        currentBuilding = 'Centre for Structural and Functional Genomics';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, jesuitResidenceP) == true)) {
        currentBuilding = 'Jesuit Residence';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, studentResidencesP) == true)) {
        currentBuilding = 'Student Residence';
      } else if ((google.maps.geometry.poly.containsLocation(currentLoc, chapelP) == true)) {
        currentBuilding = 'F.C. Smith Building<';
      } else {
        currentBuilding = 'N/A';
      }

      userContent =
          '<ion-list><h4 align=\'center\'>Concordia University</h4>' +
          '<ion-item><ion-text><label><b>Current Campus: </b></label>'+ currentCampus +'</ion-text></ion-item>'+
          '<ion-item><ion-text><label><b>Current Building: </b></label>'+ currentBuilding +'</ion-text></ion-item></ion-list><br/>'
      self.infoWindow.setContent(userContent);
      self.infoWindow.open(this.map, self.userMarker);
    });

    // Listener for the "enter building" button of info window
    this.infoWindow.addListener('domready', () => {
      if(document.getElementById(hallID))
      {
        this.enterBuildingEventListener(hallID, hallP, hallMarker, true);
      }
      else if(document.getElementById(evID))
      {
        this.enterBuildingEventListener(evID, EVP, EVMarker, false);
      }
      else if(document.getElementById(lbID))
      {
        this.enterBuildingEventListener(lbID, lbP, LBMarker, false);
      }     
      else if(document.getElementById(fgID))
      {
        this.enterBuildingEventListener(fgID, faubourgP, FGMarker, false);
      }
      else if(document.getElementById(mbID))
      {
        this.enterBuildingEventListener(mbID, molsonP, MBMarker, false);
      }     
      else if(document.getElementById(vaID))
      {
        this.enterBuildingEventListener(vaID, visualArtsP, VAMarker, false);
      }
      else if(document.getElementById(gnID))
      {
        this.enterBuildingEventListener(gnID, greyNunsP, GNMarker, false);
      }     
      else if(document.getElementById(cjID))
      {
        this.enterBuildingEventListener(cjID, journalismP, CJMarker, false);
      }
      else if(document.getElementById(scID))
      {
        this.enterBuildingEventListener(scID, scienceComplexP, SCMarker, false);
      }     
      else if(document.getElementById(ljID))
      {
        this.enterBuildingEventListener(ljID, jesuitP, LJMarker, false);
      }
      else if(document.getElementById(cbID))
      {
        this.enterBuildingEventListener(cbID, centralBuildingP, CBMarker, false);
      }     
      else if(document.getElementById(adID))
      {
        this.enterBuildingEventListener(adID, adminP, ADMarker, false);
      }
      else if(document.getElementById(pyID))
      {
        this.enterBuildingEventListener(pyID, psyP, PYMarker, false);
      }     
      else if(document.getElementById(vlID))
      {
        this.enterBuildingEventListener(vlID, vanierLibraryP, VLMarker, false);
      }
      else if(document.getElementById(psID))
      {
        this.enterBuildingEventListener(psID, phyServiceP, PSMarker, false);
      }     
      else if(document.getElementById(geID))
      {
        this.enterBuildingEventListener(geID, structuralCenterP, GEMarker, false);
      }
      else if(document.getElementById(fcID))
      {
        this.enterBuildingEventListener(fcID, chapelP, FCMarker, false);
      }     
    });

    // Closes info window when clicking somewhere else on map
    google.maps.event.addListener(this.map, 'click', function() {
      if (self.infoWindow) 
      {
        self.infoWindow.close();
      }
  });

  //Show/Hide label of markers depending on zoom level
  this.markerLabelVisibility();
  }

  //FUNCTION USED AFTER USER CLICKS THE "Enter Building" button
  async enterBuilding(id: string, polygon: any, marker: any, usePOI: boolean)
  {             
    polygon.setVisible(false);
    marker.setVisible(false);

    this.clearAllPOIMarkers();
    let b: Building = await this.buildingFactory.loadBuilding(id);
    let buildingInfo = b.getBuildingInfo();
    const buildingFloors = b.getFloors(); 

    this.indoorView(buildingInfo, polygon, marker, buildingFloors, id, usePOI);
  }



  /**
   * This method is called when user presses "Enter building" button, and it shows a drop down menu and exit button
   * which allows the user to view different floors in the building.
   * let buildingInfo is a dictionary that holds informations about the buildings
   */
  indoorView(buildingInfo: any, polygon: any, marker: any, buildingFloors: any, building: string, usingPOI: boolean): void 
  {

    let floorImage = ''; // Holds the image path
    // var norths = buildingInfo['bound'].north
    // var wests = buildingInfo['bound'].west 
    // var souths = buildingInfo['bound'].south 
    // var easts = buildingInfo['bound'].east 
    // // Create a div to hold the control for dropdown and Exit button
    // let boundControlDiv = document.createElement('div');

    // // Set CSS for the control interior of Exit
    // let boundNP = document.createElement('div');
    // let northPlus = '<ion-button >N+</ion-button>';
    // boundNP.innerHTML = northPlus;

    // let boundNM = document.createElement('div');
    // let northMinus = '<ion-button >N-</ion-button>';
    // boundNM.innerHTML = northMinus;

    //     // Set CSS for the control interior of Exit
    //     let boundSP = document.createElement('div');
    //     let southPlus = '<ion-button >S+</ion-button>';
    //     boundSP.innerHTML = southPlus;
    
    //     let boundSM = document.createElement('div');
    //     let southMinus = '<ion-button >S-</ion-button>';
    //     boundSM.innerHTML = southMinus;

    //         // Set CSS for the control interior of Exit
    // let boundWP = document.createElement('div');
    // let westPlus = '<ion-button >W+</ion-button>';
    // boundWP.innerHTML = westPlus;

    // let boundWM = document.createElement('div');
    // let westMinus = '<ion-button >W-</ion-button>';
    // boundWM.innerHTML = westMinus;

    //     // Set CSS for the control interior of Exit
    //     let boundEP = document.createElement('div');
    //     let eastPlus = '<ion-button >E+</ion-button>';
    //     boundEP.innerHTML = eastPlus;
    
    //     let boundEM = document.createElement('div');
    //     let eastMinus = '<ion-button >E-</ion-button>';
    //     boundEM.innerHTML = eastMinus;


    // boundControlDiv.appendChild(boundNP);
    // boundControlDiv.appendChild(boundNM);
    // boundControlDiv.appendChild(boundSP);
    // boundControlDiv.appendChild(boundSM);
    // boundControlDiv.appendChild(boundEP);
    // boundControlDiv.appendChild(boundEM);
    // boundControlDiv.appendChild(boundWP);
    // boundControlDiv.appendChild(boundWM);

    // Push the div into the map
    // this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(boundControlDiv);

    // var imageBound = {
    //   north: norths, // Top
    //   south: souths, // Bottom
    //   east: easts, // Right
    //   west: wests // Left
    // };

    // var index = 0.000005;
    // // Listener for Exit button
    // boundNP.addEventListener('click', function() {
    //   norths+= index
    //   console.log("North: " + norths + "West: " + wests + " South: " + souths + " East: " + easts)
    //   imageBound = {
    //     north: norths, // Top
    //     south: souths, // Bottom
    //     east: easts, // Right
    //     west: wests // Left
    //   };
    //   self.addFloorOverlay(imageBound, floorImage);
    // });

    //     // Listener for Exit button
    //     boundNM.addEventListener('click', function() {
    //       norths-= index
    //       console.log("North: " + norths + " West: " + wests + " South: " + souths + " East: " + easts)
    //       imageBound = {
    //         north: norths, // Top
    //         south: souths, // Bottom
    //         east: easts, // Right
    //         west: wests // Left
    //       };
    //       self.addFloorOverlay(imageBound, floorImage);
    //     });

    //         // Listener for Exit button
    // boundSP.addEventListener('click', function() {
    //   souths+= index
    //   console.log("North: " + norths + " West: " + wests + " South: " + souths + " East: " + easts)
    //   imageBound = {
    //     north: norths, // Top
    //     south: souths, // Bottom
    //     east: easts, // Right
    //     west: wests // Left
    //   };
    //   self.addFloorOverlay(imageBound, floorImage);
    // });

    //     // Listener for Exit button
    //     boundSM.addEventListener('click', function() {
    //       souths-= index
    //       console.log("North: " + norths + " West: " + wests + " South: " + souths + " East: " + easts)
    //       imageBound = {
    //         north: norths, // Top
    //         south: souths, // Bottom
    //         east: easts, // Right
    //         west: wests // Left
    //       };
    //       self.addFloorOverlay(imageBound, floorImage);
    //     });

    //         // Listener for Exit button
    // boundWP.addEventListener('click', function() {
    //   wests+= index
    //   console.log("North: " + norths + " West: " + wests + " South: " + souths + " East: " + easts)
    //   imageBound = {
    //     north: norths, // Top
    //     south: souths, // Bottom
    //     east: easts, // Right
    //     west: wests // Left
    //   };
    //   self.addFloorOverlay(imageBound, floorImage);
    // });

    //     // Listener for Exit button
    //     boundWM.addEventListener('click', function() {
    //       wests-= index
    //       console.log("North: " + norths + " West: " + wests + " South: " + souths + " East: " + easts)
    //       imageBound = {
    //         north: norths, // Top
    //         south: souths, // Bottom
    //         east: easts, // Right
    //         west: wests // Left
    //       };
    //       self.addFloorOverlay(imageBound, floorImage);
    //     });

    //         // Listener for Exit button
    // boundEP.addEventListener('click', function() {
    //   easts+= index
    //   console.log("North: " + norths + " West: " + wests + " South: " + souths + " East: " + easts)
    //   imageBound = {
    //     north: norths, // Top
    //     south: souths, // Bottom
    //     east: easts, // Right
    //     west: wests // Left
    //   };
    //   self.addFloorOverlay(imageBound, floorImage);
    // });

    //     // Listener for Exit button
    //     boundEM.addEventListener('click', function() {
    //       easts-= index
    //       console.log("North: " + norths + " West: " + wests + " South: " + souths + " East: " + easts)
    //       imageBound = {
    //         north: norths, // Top
    //         south: souths, // Bottom
    //         east: easts, // Right
    //         west: wests // Left
    //       };
    //       self.addFloorOverlay(imageBound, floorImage);
    //     });


    ///////////////////////////////////////////
    this.firstTime = true;
    //Make all the markers unclickable
    this.markersClickableOption(false);
    this.userMarker.setOptions({clickable: false});

    // let floorImage = ''; // Holds the image path
    const self = this;
    const empty = '';

    let imageBound = {
      north: buildingInfo['bound'].north, // Top
      south: buildingInfo['bound'].south, // Bottom
      east: buildingInfo['bound'].east, // Right
      west: buildingInfo['bound'].west // Left
    };

    this.addFloorOverlay(imageBound, floorImage);

    //ONLY DO the below work if entering indoor mode for the first time
    if(!indoorModeEnable){
      //Zoom in
      this.map.setCenter({lat: buildingInfo["Location"].lat, lng: buildingInfo["Location"].lng});
      this.map.setZoom(19);
      this.map.setOptions({minZoom: 18});

      // Dropdown content
      let selectContent = '';
      for (let i = 0; i < buildingInfo["floorNames"].length; i++) {
        selectContent += '<option value='+ (i+1) +'>'+ buildingInfo["floorNames"][i] + "</option>";
      }

      let floorDropdown =
      '<ion-label style=\'margin-right:1em\'><b>Floor</b></ion-label>' +
      '<select id =\'floors\'>' +
      selectContent +
      '</select>';

      // Create a div to hold the control for dropdown and Exit button
      var controlFloorDiv = document.createElement('div');
      var controlExitDiv = document.createElement('div');

      // Set CSS for the control border of Floor
      var controlFloorUI = document.createElement('div');
      controlFloorUI.style.backgroundColor = '#fff';
      controlFloorUI.style.border = '2px solid #fff';
      controlFloorUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';

      // Set CSS for the control interior of Floor
      var controlFloorText = document.createElement('div');
      controlFloorText.style.fontSize = '16px';
      controlFloorText.style.lineHeight = '38px';
      controlFloorText.style.paddingTop = '5px';
      controlFloorText.style.paddingLeft = '5px';
      controlFloorText.style.paddingRight = '5px';
      controlFloorText.innerHTML = floorDropdown;

      // Set CSS for the control border of Exit
      var controlExitUI = document.createElement('div');
      controlExitUI.style.marginBottom = '22px';

      // Set CSS for the control interior of Exit
      var controlExitText = document.createElement('div');
      let exitButton = '<ion-button>Exit Building</ion-button>';
      controlExitText.innerHTML = exitButton;

      // Add child div inside parent div
      controlFloorDiv.appendChild(controlFloorUI);
      controlFloorUI.appendChild(controlFloorText);

      controlExitDiv.appendChild(controlExitUI);
      controlExitUI.appendChild(controlExitText);

      // Push the div into the map
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlFloorDiv);
      this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controlExitDiv);

      if (buildingInfo['Floors'][0] != undefined && buildingInfo['Floors'][0].level == 1) {
        floorImage = buildingInfo['Floors'][0].img;
        this.addFloorOverlay(imageBound, floorImage);
      }
        
      //define dropdown handler here
      var floorDropDownHander = function(e)
      {
        componentContext.clearAllPOIMarkers()
        for (let i = 0; i < buildingInfo["floorNames"].length; i++) {
          if (buildingInfo['Floors'][i] != undefined) {
            this.currentFloor = this.value;
            if (this.value == buildingInfo['Floors'][i].level) {
              floorImage = buildingInfo['Floors'][i].img;
              self.addFloorOverlay(imageBound, floorImage);

              if(usingPOI){
                const floorLevel = buildingInfo['Floors'][i].level;
                const currentFloor: Floor = buildingFloors['HB' + floorLevel];
    
                // Check if floor object exists for building before attempting to parse it
                if (currentFloor != undefined) {
    
                  currentFloor.getPois().forEach((poi) => {
                    self.poiMarkers.push(new google.maps.Marker({
                      position: poi.getGoogleLatLng(),
                      map: self.map,
                      title: poi.getKey(),
                      label: poi.getKey()
                    }));
                  });
                }
              }
              componentContext.showFloorMapForBuilding(this.value + "");
              break;
              } else {
                  componentContext.removePreviouslyDrawnPath();
                  continue;
              }
            }
            // If no image found, then there is no layer
            this.indoorOverlay.setMap(null);
          }
        }
        
        

      // Listener for dropdown
      google.maps.event.addDomListener(document.getElementById('floors'), 'change', floorDropDownHander); 

      
      exitIndoorModeFunc = function() 
      {
        self.indoorOverlay.setMap(null);
        polygon.setVisible(true);
        marker.setVisible(true);

        controlExitText.innerHTML = empty;
        controlFloorText.innerHTML = empty;
        self.map.setOptions({minZoom: null});
        self.map.setZoom(18);


        //indoor mode values
        componentContext.removePreviouslyDrawnPath();
        componentContext.setTransitionsPaths(null);
        indoorModeEnable = false; 
        componentContext.currentActiveFloorInBuilding = 0;

        console.log("Status of indoor mode flag (on Exit): " + indoorModeEnable);   

        //Make all the markers clickable
        self.markersClickableOption(true);
        self.userMarker.setOptions({clickable: true});
        self.clearAllPOIMarkers();
      };

      //Listener for Exit button
      controlExitUI.addEventListener('click', exitIndoorModeFunc);

      //flag that indoor mode is active
      indoorModeEnable = true; 
    }//close if line 1698 (if(!this.indoorModeEnable))
  }


//Creates a polygon
createPolygon(path: any, type: string): any
{
  let polygon;
  if(type == "building")
  {
    //Polygon for each building
    polygon = new google.maps.Polygon({
      paths: path,
      fillColor: this.fColor,
    });
    polygon.setMap(this.map);
  }
  else if (type == "campus")
  {
    polygon = new google.maps.Polygon({
      paths: path,
      visible: false
    });
  }
  polygon.setMap(this.map);

  return polygon;
}

//Creates a marker
createMarker(location: any, text: string): any
{
  let marker = new google.maps.Marker
  ({
    position: location,
    map: this.map,
    icon: this.iconEmpty,
    label: 
    {
        color: this.markerColor,
        fontWeight: this.fontWeight,
        text: text,
        fontSize: this.fontSize,
    },
  });

  //Push marker to array of markers
  this.buildingMarkers.push(marker);
  return marker;
}

//Listener to markers
markerListener(marker: any, content: string)
{
  const self = this;
  google.maps.event.addListener(marker, 'click', function() 
  {
    self.infoWindow.setContent(content);
    self.infoWindow.open(this.map, marker);
  });
}

//Listener for enter building button
enterBuildingEventListener(id: string, polygon: any, marker: any, usePOI: boolean)
{
  const self = this;
  document.getElementById(id).addEventListener("click", () => {
    self.infoWindow.close();
    this.enterBuilding(id, polygon, marker, usePOI);
  });
}

//Method to set the content of info window for each building
async createinfoWindow(marker: any, buildingID: string)
{
  //Load Building
  let b: Building = await this.buildingFactory.loadBuilding(buildingID);
  let buildingInfo = b.getBuildingInfo();
  //Content of info window
  let content =
  "<ion-list> <h4 align='center'>"+buildingInfo["BuildingContent"].Name+"</h4>" +
  "<div style='max-height:250px; overflow:scroll;overflow-x:hidden;overflow-y:scroll;'>" +
  "<ion-item><ion-text> <label ><b>Address: </b></label>"+buildingInfo["BuildingContent"].Address+"</ion-text> </ion-item>" 
 
  //Departments
  if(buildingInfo["BuildingContent"].Departments.length != 0)
  {
    content += 
    "<ion-item><p><label style='margin-right:1.2em'><b>Departments: </b></label><br/><br/>"
  }
  for(let i = 0; i < buildingInfo["BuildingContent"].Departments.length; i++)
  {
    content +=
    buildingInfo["BuildingContent"].Departments[i];

    if((i+1) == buildingInfo["BuildingContent"].Departments.length)
    {
      content +=
      "</p></ion-item>" 
    }
    else
    {
      content += "<br/><br/>";
    }
  }

  //Services
  if(buildingInfo["BuildingContent"].Services.length != 0)
  {
    content += 
    "<ion-item><p><label style='margin-right:3.2em'><b>Services: </b></label><br/><br/>"
  }
  for(let i = 0; i < buildingInfo["BuildingContent"].Services.length; i++)
  {
    content +=
    buildingInfo["BuildingContent"].Services[i];

    if((i+1) == buildingInfo["BuildingContent"].Services.length)
    {
      content +=
      "</p></ion-item>" 
    }
    else
    {
      content += "<br/><br/>";
    }
  }

  //Image
  content +=
  "</ion-list><br/>"+
  "<div align ='center'><img width='"+buildingInfo["BuildingContent"].ImgWidth+"'src='"+buildingInfo["BuildingContent"].BuildingImg+"'></div></div>"

  //Enter Building Button
  if(buildingInfo["BuildingContent"].EnterButton == "true")
  {
    content +=
    "<div align ='center'><ion-button id="+buildingID+">Enter Building</ion-button></div>"
  }
  //Add listener to marker
  this.markerListener(marker, content);
}

//This method make markers clickable or unclickable depending on the value of option (true or false)
markersClickableOption(option: boolean)
{
  for(let i = 0; i < this.buildingMarkers.length; i++)
  {
    this.buildingMarkers[i].setOptions({clickable: option});
  }
}

//This method changes the visibility of the labels of markers depending on the zoom level
markerLabelVisibility()
{
  const self = this;

  //Array contain every label of markers
  let markersLabel = [];
  for(let i = 0; i < this.buildingMarkers.length; i++)
  {
    markersLabel.push(this.buildingMarkers[i].getLabel());
  }

  //Check for zoom changed
  google.maps.event.addListener(self.map, 'zoom_changed', function () {
    //Hide markers
    if (self.map.getZoom() < 14)
    {
      for(let i = 0; i < self.buildingMarkers.length; i++)
      {
        self.buildingMarkers[i].setLabel(null)
      }
    }
    //Show markers
    else
    {
      for(let i = 0; i < self.buildingMarkers.length; i++)
      {
        self.buildingMarkers[i].setLabel(markersLabel[i])
      }
    }
  });
}

//Adds a floor overlay on a building 
addFloorOverlay(imageBound: any, floorImage :string)
{
  this.indoorOverlay.setMap(null);
  // //Only create an indoorOverlay object the first time we enter a building
  // if(this.firstTime == true)
  // {
  //   this.indoorOverlay = new google.maps.GroundOverlay(
  //       floorImage,
  //       imageBound);
  //   this.firstTime = false;
  // }
  // else
  // {
  //   //If not the first time, then we should just change floor plans
  //   this.indoorOverlay.set("url", floorImage)
  // }
  this.indoorOverlay = new google.maps.GroundOverlay(
    floorImage,
    imageBound);
this.firstTime = false;


  this.indoorOverlay.setMap(this.map);
}
    
  

  /**
   * Takes as parameter a list of Locations and draws a path on the map using Google Maps API's Polyline object.
   * @param locationList
   */
  drawPath(locationList: Location[])
  {
    this.removePreviouslyDrawnPath();
    var pathCoordinates = [];
    
    locationList.forEach((location: Location) => {
      pathCoordinates.push({lat: location.getLat(), lng: location.getLng()});
    });

    let path = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#0000FF',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    let startLabel = "Start";

    const startMarker = new google.maps.Marker({
      position: locationList[0].getGoogleLatLng(),
      map: this.map,
      title: 'Here',
      label: startLabel
    });


    let endLabel = "End";

    const endMarker = new google.maps.Marker({
      position: locationList[locationList.length - 1].getGoogleLatLng(),
      map: this.map,
      title: 'End',
      label: endLabel
    });

    //remember marker instance to disable later
    this.currentActiveRoute = {
      "path": path, 
      "startMark": startMarker, 
      "endMark": endMarker
    };

    path.setMap(this.map);
  }

  // Retrieves the POI searched from home-search component and locates it on the map
  goToIndoorPOI(poi: IndoorPOI) {
    this.clearAllPOIMarkers();
    this.focusMap(poi);


    this.poiMarkers.push(new google.maps.Marker({
      position: poi.getGoogleLatLng(),
      map: this.map,
      title: poi.getKey(),
      label: poi.getKey()
    }));

    if (poi.getKey().startsWith('HB')) {
      this.poiMarkers[0].label = poi.getKey().replace('B', '');
      this.poiMarkers[0].title = poi.getKey().replace('B', '');
    }

    this.map.setZoom(20);
  }
  removePreviouslyDrawnPath(){
    if(this.currentActiveRoute["path"] != undefined || this.currentActiveRoute["path"] != null){
      //hide or remove the current route drawn
      this.currentActiveRoute["path"].setMap(null);
      this.currentActiveRoute["startMark"].setMap(null);
      this.currentActiveRoute["endMark"].setMap(null);
      this.currentActiveRoute = {};
    }
  }


  // Clears all POI markers from the map component
  clearAllPOIMarkers()
  {
    if(this.poiMarkers === null || this.poiMarkers === undefined)
      return;

    this.poiMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    this.poiMarkers = [];
  }


  /**
   * Method used  to focus in on a give building
   * @param level Method used to 
   */
  async showHallBuildingIndoor(focus: boolean){
    //focus on overall hall
    if(!indoorModeEnable && focus)
      this.focusMap(new Location(45.497194, -73.578886, 0));
    //show the floor selected
    let buildingKey = "HB";
    var hallP = this.onMapPolygons[buildingKey];
    let hallMarker = this.onMapMarkers[buildingKey]
    this.enterBuilding(buildingKey, hallP, hallMarker, false);
  }

  showFloorMapForBuilding(curFloorNum: string){

    let floorNumTransition: string = curFloorNum;

    if(this.currentActiveFloorInBuilding != 0)
      floorNumTransition = this.currentActiveFloorInBuilding + "";

    //get the path for
    if(this.indoorTransitionDirections[floorNumTransition] == undefined || this.indoorTransitionDirections[floorNumTransition] == null){
      this.removePreviouslyDrawnPath();
    }else{
      let path: Location[] = this.indoorTransitionDirections[floorNumTransition];
      this.drawPath(path);
    }
  }

  setTransitionsPaths(transitions: any){
    this.removePreviouslyDrawnPath();
    this.indoorTransitionDirections = transitions;
  }

  isIndoorModeActive(): boolean{
    return indoorModeEnable;
  }

  quitIndoorMode(){
    if(indoorModeEnable)
      exitIndoorModeFunc();
  }
}


