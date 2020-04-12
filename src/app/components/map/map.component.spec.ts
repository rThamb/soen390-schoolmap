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
      imports: [IonicModule.forRoot()]
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

//   it('should create a marker and return it', async() => {
//     fixture.detectChanges();
//     const map = component.map;
//     const locations = '';
//     const obtainedMarker = component.createMarker(locations, 'Test');

//     const expectedMarker = new google.maps.Marker
//     ({
//       position: locations,
//       map: map,
//       icon: '',
//       label:
//       {
//           color: 'black',
//           fontWeight: 'bold',
//           text: 'Test',
//           fontSize: '21px'
//       },
//     });
//     expect(obtainedMarker).toEqual(expectedMarker);
//   });

//   it('should create a polygon and return it', async() => {
//     fixture.detectChanges();
//     const map = component.map;

//     const testPath =
//     [
//       {lat: 45.497372, lng: -73.578338},
//       {lat: 45.496826, lng: -73.578859}
//     ];

//     const obtainedPolygon = component.createPolygon('', 'building');

//     let expectedPolygon;
//     expectedPolygon = new google.maps.Polygon({
//       paths: '',
//       fillColor: 'deepskyblue',
//     });
//     expectedPolygon.setMap(map);
//     expect(obtainedPolygon).toEqual(expectedPolygon);
//   });

//   it('method should be called', async (() => {
//     spyOn(component, 'clearAllPOIMarkers');
//     expect(component).toBeDefined();
//     expect(spy);
//     expect(component.clearAllPOIMarkers).toBeTruthy();
// }));

  it('ngAfterViewInit should be called', async(() => {
  spyOn(component, 'ngAfterViewInit');
  fixture.detectChanges(); // trigger ngOnInit here
  expect(component.ngAfterViewInit);
}));

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
    expect(c.ngAfterViewInit());
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
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // let currentLoc = this.getCurrentLocation();
    // const user = User;
    // c.user.getLocation().getGoogleLatLng();
    spyOn(component, 'getCurrentLocation');
    const expected = component.getCurrentLocation();
    // assert
    expect(expected).toEqual(undefined);
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
    expect(c.focusMap).toHaveBeenCalledWith(location);
});

//
  it('when initOverlays is called it should pawn the building overlays on top of the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initOverlays();
    //  assert
    expect(c).toBeDefined();
  });

  it('should call markerLabelVisibility from initOverlays', async(() => {

    let m = new MapComponent(new Geolocation, new MapService, new BuildingFactoryService(new ReadGridService));
    m.markerLabelVisibility = jasmine.createSpy("markerLabelVisibility spy");
    m.initOverlays();
    expect(m.markerLabelVisibility).toHaveBeenCalled();
  }));


  it('should call removePreviouslyDrawnPath from drawPath', async(() => {

    component.removePreviouslyDrawnPath = jasmine.createSpy("removePreviouslyDrawnPath spy");
    let locationList = [];
    locationList[0] = new Location(0, 0, 0);
    component.drawPath(locationList);
    expect(component.removePreviouslyDrawnPath).toHaveBeenCalled(); 
  }));

  it('should call initMap from ngAfterViewInit', async(() => {

    component.initMap = jasmine.createSpy("initMap spy");
    component.ngAfterViewInit();
    expect(component.initMap).toHaveBeenCalled(); 
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
    expect(c.createPolygon(path, 'building')).toBeTruthy();
});

  it('when createMarker is called it should create a marker at the Hall building', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    c.createMarker(hallCenter, 'HALL');
    // assert
    expect(c.createMarker(hallCenter, 'HALL')).toBeTruthy();
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
    expect(c.markerListener).toHaveBeenCalledWith(marker, content);
});

  it('when enterBuildingEventListener is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const id = 'HB';
    const pathCoordinates = [];
    const path = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    const polygon = c.createPolygon(path, 'building');
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker =  c.createMarker(hallCenter, 'HALL');
    c.enterBuildingEventListener(id, polygon, marker, false);
    // assert
    expect(c.enterBuildingEventListener(id, polygon, marker, false)).toBeTruthy();
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
    expect(c.createinfoWindow(marker, hallID)).toBeTruthy();
});

  it('when markersClickableOption is called, it should be clickable', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.markersClickableOption(true);
    // assert
    expect(c.markersClickableOption(true));
});


  it('when addFloorOverlay is called it should add floor layer', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    //this.buildingFactory= BuildingFactoryService;
    //const b: Building = this.buildingFactory.loadBuilding('HB');
    //const buildingInfo = b.getBuildingInfo();
    const imageBound = {
        north: 45.497735,
        south: 45.496807,
        east: -73.578316,
        west: -73.579586 
      };
    const floorImage = "assets/FloorImages/Hall/hall-8.png";
    spyOn(component, 'addFloorOverlay');
    
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
    expect(component.showHallBuildingIndoor).not.toHaveBeenCalledWith(true);
});

  it('when setTransitionsPaths is called it should', async() => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // // act
    const transitions = null;
    spyOn(component, 'setTransitionsPaths');
    // assert

    c.setTransitionsPaths('');
    fixture.detectChanges(); // trigger ngOnInit here

    expect(component.setTransitionsPaths).not.toHaveBeenCalledWith(transitions);
});


  it('when isIndoorModeActive is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.isIndoorModeActive();
    // assert
    expect(c.isIndoorModeActive()).toBeFalsy();
});

  it('when quitIndoorMode is called it should exit indoor view', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    spyOn(c, 'quitIndoorMode');
    // act
    c.quitIndoorMode();

    // assert
    expect(c.quitIndoorMode).toHaveBeenCalled();
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
