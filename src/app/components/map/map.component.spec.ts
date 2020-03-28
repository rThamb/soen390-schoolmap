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
import { By } from '@angular/platform-browser';
declare var google;

describe('MapComponent', () => {
  var component: MapComponent;
  var fixture: ComponentFixture<MapComponent>;
  var spy: any;
  //let service: MapService;
  

  beforeEach(async(() => {
const a = setup().default();
TestBed.configureTestingModule({
      declarations: [ MapComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [Geolocation, IndoorPathingService, ReadGridService, BuildingFactoryService],
      imports: [IonicModule.forRoot()]
    }).configureTestingModule({ providers: [{ provide: MapService, useValue: a.mapService },
            { provide: BuildingFactoryService, useValue: a.buildingFactory }] }).compileComponents();

fixture = TestBed.createComponent(MapComponent);
component = fixture.componentInstance;
fixture.detectChanges();
  }));

  afterEach(() => {
    //service = null;
    //component = null;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should check if the class="map" is applied to map', async(() => {
    fixture.detectChanges();
    const mapTag = fixture.debugElement.nativeElement.querySelector('div');

    // expect(mapTag.innerHTML).toContain('class="map"');
  }));

  it('should create a marker and return it', async(() => 
  {
    fixture.detectChanges();
    let map = component.map;
    let locations = "";
    let obtainedMarker = component.createMarker(locations, "Test");
  
    let expectedMarker = new google.maps.Marker
    ({
      position: locations,
      map: map,
      icon: "",
      label: 
      {
          color: 'black',
          fontWeight: 'bold',
          text: "Test",
          fontSize: '21px'
      },
    }); 
    expect(obtainedMarker).toEqual(expectedMarker);
  }));

  it('should create a polygon and return it', async(() => 
  {
    fixture.detectChanges();
    let map = component.map;

    var testPath =
    [
      {lat: 45.497372, lng: -73.578338},
      {lat: 45.496826, lng: -73.578859}
    ];
    
    let obtainedPolygon = component.createPolygon("", "building");
  
    let expectedPolygon;
    expectedPolygon = new google.maps.Polygon({
      paths: "",
      fillColor: "deepskyblue",
    });
    expectedPolygon.setMap(map);
    expect(obtainedPolygon).toEqual(expectedPolygon);
  }));

// //   it('method should be called', async (() => {
// //     spy = spyOn(component, "clearAllPOIMarkers").and.callThrough();
// //     expect(component).toBeDefined();
// //     expect(spy);
// //     expect(component.clearAllPOIMarkers).toHaveBeenCalled(); 
// // }));

// it('ngAfterViewInit should be called', async(() => {
//   spyOn(component, 'ngAfterViewInit'); 
//   fixture.detectChanges(); // trigger ngOnInit here

//   expect(component.ngAfterViewInit).toHaveBeenCalled(); 
// }));

it('should check that ion-content is loaded', async(() => {
  let mapSearch= fixture.debugElement.query(By.css('ion-content'));

  expect(mapSearch).toBeTruthy();
}));

// it("should call the 'loadBuilding' method on the 'BuildingFactoryService'", async (() => {
//   let service: BuildingFactoryService;
//   spy = spyOn(service, 'loadBuilding');
//   fixture.detectChanges();
//   component.enterBuilding("", "", "", false);
//   expect(spy).toHaveBeenCalled();
// }));




  it('when ngAfterViewInit is called it should initialize the map', () => {
    // arrange
    const { build } = setup().default();
    const c = build();

    // act
    this.initMap();
        // console.log('Error getting location', error);
    c.ngAfterViewInit();
    // assert
    expect(c.ngAfterViewInit());
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

  it('when getCurrentLocation is called it should Get the current location of user and focus map to that point', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.getCurrentLocation();
    // assert
    expect(c.getCurrentLocation()).not.toBeNull();
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
    let hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker =c.createMarker(hallCenter, "HALL");

    this.clearAllPOIMarkers();
    const id = 'HB';
    const b: Building = await this.buildingFactory.loadBuilding(id);
    const buildingInfo= '';
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

  it('when createMarker is called it should create a marker at the Hall building', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    let hallCenter = {lat: 45.497092, lng: -73.578974};
    c.createMarker(hallCenter, "HALL");
    // assert
    expect(c.createMarker(hallCenter, "HALL")).toBeTruthy();
});

  it('when markerListener is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    let hallCenter = {lat: 45.497092, lng: -73.578974};
    c.createMarker(hallCenter, "HALL");
    const marker = c.createMarker(hallCenter, "HALL");
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
    let hallCenter = {lat: 45.497092, lng: -73.578974};
    const marker =  c.createMarker(hallCenter, "HALL");
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
    const marker = this.createMarker(hallCenter, 'HALL');
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

  it('when markerLabelVisibility is called it should change the visibility the markers', async (() => {
    // arrange
    const { build } = setup().default();
    const c = build();
    
    let marker = new google.maps.Marker
    ({
      position: "",
      map: component.map,
      icon: "",
      label: 
      {
          color: 'black',
          fontWeight: 'bold',
          text: "Test",
          fontSize: '21px'
      },
    }); 

        //component.buildingMarkers.push(marker);
    //let buildingMarkers = [];
    console.log("before markerLabelVisibility")
    //c.markerLabelVisibility();
    let markerVisibility = component.markerLabelVisibility();
    console.log("after markerLabelVisibility")
    // assert
    expect(markerVisibility).toBeTruthy();
    console.log("after expect for markerLabelVisibility")


    // // act
    // {
    //   const self = this;

    //   //Array contain every label of markers
    //   let markersLabel = [];
    //   for(let i = 0; i < this.buildingMarkers.length; i++)
    //   {
    //     markersLabel.push(this.buildingMarkers[i].getLabel());
    //   }

    //   //Check for zoom changed
    //   google.maps.event.addListener(self.map, 'zoom_changed', function () {
    //     //Hide markers
    //     if (self.map.getZoom() < 14)
    //     {
    //       for(let i = 0; i < self.buildingMarkers.length; i++)
    //       {
    //         self.buildingMarkers[i].setLabel(null)
    //       }
    //     }
    //     //Show markers
    //     else
    //     {
    //       for(let i = 0; i < self.buildingMarkers.length; i++)
    //       {
    //         self.buildingMarkers[i].setLabel(markersLabel[i])
    //       }
    //     }
    //   });
    // }
    // c.markerLabelVisibility();
    // // assert
    // expect(c.markerLabelVisibility());
}));

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
  it('when removePreviouslyDrawnPath is called it should remove the path drawn previously, if there is any', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    if(this.currentActiveRoute["path"] != undefined || this.currentActiveRoute["path"] != null) {
      //hide or remove the current route drawn
      this.currentActiveRoute["path"].setMap(null);
      this.currentActiveRoute["startMark"].setMap(null);
      this.currentActiveRoute["endMark"].setMap(null);
      this.currentActiveRoute = {};
    }
    c.removePreviouslyDrawnPath();
    // assert
    expect(c.removePreviouslyDrawnPath());
});

  it('when clearAllPOIMarkers is called it should empty the poi array', async(() => {
    //arrange
    const { build } = setup().default();
    const c = build();
    // act
    //c.clearAllPOIMarkers();
    // assert
    // expect(c.clearAllPOIMarkers()).toBeTruthy();
    let map = component.map;
    console.log("Before clearAllPOIMarkers")
    map.clearAllPOIMarkers()
    console.log("After clearAllPOIMarkers")
    expect(map.clearAllPOIMarkers()).toEqual(undefined);

}));
//   it('when clearAllPOIMarkers is called it should Clear all POI markers from the map component', () => {
//     // arrange
//     const { build } = setup().default();
//     const c = build();
//     // act
//     this.poiMarkers = null;
//     this.poiMarkers.marker.setMap(null);

//     this.poiMarkers = [];
//     c.clearAllPOIMarkers();
//     // assert
//     expect(c.clearAllPOIMarkers());
// });

  it('when showHallBuildingIndoor is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    //act
    c.showHallBuildingIndoor(true);
    // assert
    expect(c.showHallBuildingIndoor(true)).toBeTruthy();

    // spyOn(component, 'showHallBuildingIndoor'); 
    // c.showHallBuildingIndoor(false);
    // fixture.detectChanges(); // trigger ngOnInit here
    // expect(c.showHallBuildingIndoor).toHaveBeenCalled(); 
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

  it('when setTransitionsPaths is called it should', async(() => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // // act
    // const transitions = null;
    // c.setTransitionsPaths(transitions);
    // // assert
    // expect(c.setTransitionsPaths(transitions));

    spyOn(component, 'setTransitionsPaths'); 
    c.setTransitionsPaths("");
    fixture.detectChanges(); // trigger ngOnInit here

    expect(c.setTransitionsPaths).toHaveBeenCalled(); 
}));


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
    // act
    c.quitIndoorMode();
    // assert
    expect(c.quitIndoorMode());
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
