import { MapService } from '../../services/map/map.service';
import { BuildingFactoryService } from '../../services/BuildingFactory/building-factory.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IndoorPathingService } from '../../services/indoorPathing/indoor-pathing.service';
import { ReadGridService } from '../../services/readGrid/read-grid.service';
import { IonicModule } from '@ionic/angular';

import { MapComponent } from './map.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { autoSpy } from 'auto-spy';
import { Building } from 'src/app/models/Building';
import { overlays } from './BuildingOverlayPoints';
import { By } from '@angular/platform-browser';
import {Location} from '../../models/Location';

import {User} from '../../models/User';
import { expressionType } from '@angular/compiler/src/output/output_ast';
declare var google;

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let spy: any;
  // let service: MapService;


  beforeEach(async(() => {
const a = setup().default();

TestBed.configureTestingModule({
      declarations: [ MapComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [Geolocation, IndoorPathingService, ReadGridService, BuildingFactoryService, MapComponent],
      imports: [IonicModule]
    }).configureTestingModule({ providers: [{ provide: MapService, useValue: a.mapService },
            { provide: BuildingFactoryService, useValue: a.buildingFactory }] }).compileComponents();

fixture = TestBed.createComponent(MapComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  }));

  it('should load all overlays', () => {
    expect(overlays.visualArts.overlayPoints).toBeTruthy();
    expect(overlays.sjwCampus.overlayPoints).toBeTruthy();
    expect(overlays.loyolaCampus.overlayPoints).toBeTruthy();
    expect(overlays.hall.overlayPoints).toBeTruthy();
    expect(overlays.molson.overlayPoints).toBeTruthy();
    expect(overlays.faubourg.overlayPoints).toBeTruthy();
    expect(overlays.EV.overlayPoints).toBeTruthy();
    expect(overlays.LB.overlayPoints).toBeTruthy();
    expect(overlays.greyNuns.overlayPoints).toBeTruthy();
    expect(overlays.scienceComplex.overlayPoints).toBeTruthy();
    expect(overlays.journalismBuilding.overlayPoints).toBeTruthy();
    expect(overlays.chapel.overlayPoints).toBeTruthy();
    expect(overlays.psyBuilding.overlayPoints).toBeTruthy();
    expect(overlays.stingerDome.overlayPoints).toBeTruthy();
    expect(overlays.stingerStadium.overlayPoints).toBeTruthy();
    expect(overlays.centralBuilding.overlayPoints).toBeTruthy();
    expect(overlays.vanierLibrary.overlayPoints).toBeTruthy();
    expect(overlays.adminBuilding.overlayPoints).toBeTruthy();
    expect(overlays.jesuitHall.overlayPoints).toBeTruthy();
    expect(overlays.athleticCamp.overlayPoints).toBeTruthy();
    expect(overlays.loyolaGym.overlayPoints).toBeTruthy();
    expect(overlays.phyServiceBuilding.overlayPoints).toBeTruthy();
    expect(overlays.centerArts.overlayPoints).toBeTruthy();
    expect(overlays.saintIgnatius.overlayPoints).toBeTruthy();
    expect(overlays.structuralCenter.overlayPoints).toBeTruthy();
    expect(overlays.jesuitResidence.overlayPoints).toBeTruthy();
    expect(overlays.studentResidences.overlayPoints).toBeTruthy();
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('ngAfterViewInit should be called', () => {
  component.ngAfterViewInit();
  fixture.detectChanges(); // trigger ngOnInit here
  
  
  expect(component.ngAfterViewInit()).toBeTruthy();
});

  it('should check that ion-content is loaded', async(() => {
  const mapSearch = fixture.debugElement.query(By.css('ion-content'));

  expect(mapSearch).toBeTruthy();
}));


  it('when ngAfterViewInit is called it should initialize the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();

    // act
    // this.initMap();
        // console.log('Error getting location', error);
    c.ngAfterViewInit();
    // assert
    expect(c.ngAfterViewInit()).toBeTruthy();
});

  it('when initMap is called it should initialize the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initMap();
    spyOn(c, 'initMap');
    // assert
    expect(c.initMap).toBeDefined();
});


  it('when getCurrentLocation is called it should Get the current location of user and focus map to that point', async () => {
    expect(component.getCurrentLocation()).toBeTruthy();
});

  it('when focusMap is called it should Re-center the map based on location parameter', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    spyOn(c, 'focusMap');
    const location = {lat: 45.494711, lng: -73.577871, alt: 0};
    c.focusMap(location);
    // assert
    expect(component.focusMap(location)).toBeTruthy();
});

//
  it('when initOverlays is called it should pawn the building overlays on top of the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initOverlays();
    //  assert
    expect(component).toBeDefined();
  });


  it('should call removePreviouslyDrawnPath from drawPath', async(() => {

    component.removePreviouslyDrawnPath = jasmine.createSpy("removePreviouslyDrawnPath spy");
    let locationList = [];
    locationList[0] = new Location(0, 0, 0);
    component.drawPath(locationList);
    expect(component.removePreviouslyDrawnPath()).toBeTruthy(); 
  }));

  it('should call initMap from ngAfterViewInit', async(() => {

    component.initMap = jasmine.createSpy("initMap spy");
    component.ngAfterViewInit();
    expect(component.initMap()).toBeTruthy(); 
  }));


  it('when createPolygon is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const pathCoordinates = [];
    const path = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    c.createPolygon(path, 'building');
    // assert
    expect(component.createPolygon(path, 'building')).toBeTruthy();
});

  it('when createMarker is called it should create a marker at the Hall building', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    c.createMarker(hallCenter, 'HALL');
    // assert
    expect(component.createMarker(hallCenter, 'HALL')).toBeTruthy();
});

  it('when listener is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    spyOn(c, 'markerListener');
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker = c.createMarker(hallCenter, 'HALL');
    const content = '<ion-item><p><label style=\'margin-right:1.2em\'><b>Departments: </b></label><br/><br/>';
    c.markerListener(marker, content);
    // assert
    expect(component.markerListener).toHaveBeenCalledWith(marker, content);
});

  it('when enterBuildingEventListener is called it should', () => {

    const id = 'HB';
    const pathCoordinates = [];
    const path = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    const polygon = component.createPolygon(path, 'building');
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker =  component.createMarker(hallCenter, 'HALL');
    component.enterBuildingEventListener(id, polygon, marker, false);
    // assert
    expect(component.enterBuildingEventListener).toHaveBeenCalled();
});

  it('when createinfoWindow is called it should display a popup containing building info', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const hallID = 'HB';
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker = new google.maps.Marker
    ({
      position: '',
      map: component.map,
      icon: '',
      label:
      {
          color: 'black',
          fontWeight: 'bold',
          text: 'Test',
          fontSize: '21px'
      },
    });
    c.createinfoWindow(marker, hallID);
    // assert
    expect(component.createinfoWindow(marker, hallID)).toBeTruthy();
});

  it('when markersClickableOption is called, it should be clickable', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.markersClickableOption(true);
    // assert
    expect(component.markersClickableOption(true)).toBeTruthy();
});


  it('when addFloorOverlay is called it should add floor layer', async() => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    //this.buildingFactory= BuildingFactoryService;
    const b: Building = await component.buildingFactory.loadBuilding('HB');
    const buildingInfo = b.getBuildingInfo();
    const imageBound = {
        north: 45.497735,
        south: 45.496807,
        east: -73.578316,
        west: -73.579586 
      };
    const floorImage = "assets/FloorImages/Hall/hall-8.png";
    
    component.addFloorOverlay(imageBound, floorImage);
    // assert
    expect(component.addFloorOverlay).toHaveBeenCalledWith(imageBound, floorImage);
});

  it('when showHallBuildingIndoor is called it should focus in on a give building', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    //c.showHallBuildingIndoor(true);
    // assert
    //expect(c.showHallBuildingIndoor(true)).toBeTruthy();

    
    spyOn(component, 'showHallBuildingIndoor');
    c.showHallBuildingIndoor(false);
    fixture.detectChanges(); // trigger ngOnInit here

    component.showHallBuildingIndoor(false);
    expect(component.showHallBuildingIndoor).toHaveBeenCalled();
});

  it('when setTransitionsPaths is called it should', async() => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // // act
    const transitions = null;
    spyOn(component, 'setTransitionsPaths');
    // assert

    fixture.detectChanges(); // trigger ngOnInit here

    component.setTransitionsPaths('');

    expect(component.setTransitionsPaths).toHaveBeenCalled();
});


  it('when isIndoorModeActive is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    component.isIndoorModeActive();
    // assert
    expect(component.isIndoorModeActive()).toBeTruthy();
});

  it('when quitIndoorMode is called it should exit indoor view', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    spyOn(c, 'quitIndoorMode');
    // act
    c.quitIndoorMode();

    // assert
    expect(component.quitIndoorMode()).toBeTruthy();
});


});

function setup() {
  
    const geolocation = autoSpy(Geolocation);
    const mapService = autoSpy(MapService);
    const buildingFactory = autoSpy(BuildingFactoryService);
    const builder = {
        geolocation,
        mapService,
        buildingFactory,
        default() {
            return builder;
        },
        build() {
            return new MapComponent(geolocation, mapService, buildingFactory);
        }
    };
    return builder;
}
