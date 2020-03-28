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
declare var google;

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ MapComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [Geolocation, IndoorPathingService, ReadGridService],
      imports: [IonicModule.forRoot()]
    }).configureTestingModule({ providers: [{ provide: MapService, useValue: a.mapService },
            { provide: BuildingFactoryService, useValue: a.buildingFactory }] }).compileComponents();

fixture = TestBed.createComponent(MapComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when ngAfterViewInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngAfterViewInit();
    // assert
    // expect(c).toEqual
});

  it('when initMap is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initMap();
    // assert
    // expect(c).toEqual
});

  it('when setDirectionsMap is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.setDirectionsMap();
    // assert
    // expect(c).toEqual
});

  it('when getCurrentLocation is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.getCurrentLocation();
    // assert
    // expect(c).toEqual
});

  it('when focusMap is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const location = c.getCurrentLocation();
    c.focusMap(location);
    // assert
    // expect(c).toEqual
});

  it('when initOverlays is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.initOverlays();
    // assert
    // expect(c).toEqual
});

  it('when enterBuilding is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const buildingKey = 'HB';
    const onMapPolygons= [];
    const onMapMarkers = [];
    const hallP = onMapPolygons[buildingKey];
    const hallMarker = onMapMarkers[buildingKey];
    c.enterBuilding(buildingKey, hallP, hallMarker, false);

    // assert
    // expect(c).toEqual
});

  it('when indoorView is called it should', async () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // Polygon for each building
    const pathCoordinates = [];
    const path = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    const polygon = c.createPolygon(path, 'building');
    const marker = c.createMarker('0,0', 'concordia');

    this.clearAllPOIMarkers();
    const id = 'HB';
    const b: Building = await this.buildingFactory.loadBuilding(id);
    const buildingInfo = b.getBuildingInfo();
    const buildingFloors = b.getFloors();

    c.indoorView(buildingInfo, polygon, marker, buildingFloors, id, false);
    // assert
    expect(c.indoorView(buildingInfo, polygon, marker, buildingFloors, id, false)).toBeTruthy();
});

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

  it('when createMarker is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.createMarker('0,0', 'concordia');
    // assert
    expect(c.createMarker('0,0', 'concordia')).toBeTruthy();
});

  it('when markerListener is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const marker = c.createMarker('0,0', 'concordia');
    const start = '<ion-item><p><label style=\'margin-right:1.2em\'><b>Departments: </b></label><br/><br/>';
    c.markerListener(marker, start);
    // assert
    expect(c.markerListener(marker, 'start')).toBeTruthy();
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
    const marker = c.createMarker('0,0', 'concordia');
    c.enterBuildingEventListener(id, polygon, marker, false);
    // assert
    expect(c.enterBuildingEventListener(id, polygon, marker, false)).toBeTruthy();
});

  it('when createinfoWindow is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const marker = c.createMarker('0,0', 'concordia');
    const hallID = 'HB';
    const hallCenter = {lat: 45.497092, lng: -73.578974};
    const hallMarker = this.createMarker(hallCenter, 'HALL');
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

  it('when markerLabelVisibility is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.markerLabelVisibility();
    // assert
    expect(c.markerLabelVisibility()).toBeTruthy();
});

  it('when addFloorOverlay is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const b: Building = this.buildingFactory.loadBuilding('HB');
    const buildingInfo = b.getBuildingInfo();
    const imageBound = {
        north: buildingInfo.bound.north, // Top
        south: buildingInfo.bound.south, // Bottom
        east: buildingInfo.bound.east, // Right
        west: buildingInfo.bound.west // Left
      };
    const floorImage = buildingInfo.Floors[0].img;
    c.addFloorOverlay(imageBound, floorImage);
    // assert
    expect(c.addFloorOverlay(imageBound, floorImage)).toBeTruthy();
});

  it('when drawPath is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const pathCoordinates = [];
    const locationList = [];
    locationList.forEach((location: Location) => {
      pathCoordinates.push({lat: 0, lng: 0}, {lat: 1, lng: 2}, {lat: 3, lng: 2});
    });
     // assert
    expect(c.drawPath(pathCoordinates)).toBeTruthy();
});
/*
  it('when goToIndoorPOI is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.goToIndoorPOI(poi);
    // assert
     expect(c.goToIndoorPOI('HB')).toBeTruthy();
});
*/
  it('when removePreviouslyDrawnPath is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.removePreviouslyDrawnPath();
    // assert
    expect(c.removePreviouslyDrawnPath()).toBeTruthy();
});

  it('when clearAllPOIMarkers is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.clearAllPOIMarkers();
    // assert
    expect(c.clearAllPOIMarkers()).toBeTruthy();
});

  it('when showHallBuildingIndoor is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.showHallBuildingIndoor(true);
    // assert
    expect(c.showHallBuildingIndoor(true)).toBeTruthy();
});

  it('when showFloorMapForBuilding is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.showFloorMapForBuilding('');
    // assert
    expect(c.showFloorMapForBuilding('')).toBeTruthy();
});

  it('when setTransitionsPaths is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    const transitions = null;
    c.setTransitionsPaths(transitions);
    // assert
    expect(c.setTransitionsPaths(transitions)).toBeTruthy();
});

  it('when isIndoorModeActive is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.isIndoorModeActive();
    // assert
    expect(c.isIndoorModeActive()).toBeTruthy();
});

  it('when quitIndoorMode is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.quitIndoorMode();
    // assert
    expect(c.quitIndoorMode()).toBeTruthy();
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
